import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Dialog, DialogContent } from '../../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Separator } from '../../ui/separator';
import { User, Calendar } from 'lucide-react';
import  type { Invoice, PromoCode,CompletedOrder } from '../../../types/pos';
import PromoCodeSection from './PromoCodeSection';
import PaymentSection from './PaymentSection';
import BigNumber from 'bignumber.js';

interface POSSidebarProps {
  discountCode: string;
  setDiscountCode: (value: string) => void;
  currentTime: string;
  invoice: Invoice;
  onPaymentComplete: (completedOrder: CompletedOrder) => void;
  onPromoUpdate: (backendData: any) => void;
  orderId: string | null;
}

export default function POSSidebar({ 
  discountCode, 
  setDiscountCode, 
  currentTime,
  invoice,
  onPaymentComplete,
  onPromoUpdate,
  orderId
}: POSSidebarProps) {
  // 🔄 NEW: State for promo codes and payment
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [updatedInvoice, setUpdatedInvoice] = useState<Invoice>(invoice);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // 🔄 NEW: Handle promo code application - using backend data
  const handlePromoApplied = (promoCode: PromoCode | null, backendData?: any) => {
    console.log('🔍 [PROMO DEBUG] handlePromoApplied called');
    console.log('📋 PromoCode:', promoCode);
    console.log('📊 Backend Data:', backendData);
    
    if (promoCode && backendData) {
      console.log('💰 Order Amount:', invoice.finalAmountBeforeTax);
      console.log('🎫 Promo Details:', {
        code: promoCode.codePromotion,
        discountType: promoCode.discountType,
        percentValue: promoCode.percentDiscountValue,
        maxDiscountValue: promoCode.maxDiscountValue,
        minOrderAmount: promoCode.minOrderAmount
      });
      
      // Calculate expected discount (frontend logic)
      let expectedDiscount = 0;
      if (promoCode.discountType === 'percent') {
        expectedDiscount = (invoice.finalAmountBeforeTax * promoCode.percentDiscountValue) / 100;
        if (promoCode.maxDiscountValue && expectedDiscount > promoCode.maxDiscountValue) {
          console.log('⚠️ [FRONTEND] Discount capped by maxValue:', {
            calculated: expectedDiscount,
            maxValue: promoCode.maxDiscountValue,
            finalDiscount: promoCode.maxDiscountValue
          });
          expectedDiscount = promoCode.maxDiscountValue;
        }
      } else {
        expectedDiscount = promoCode.maxDiscountValue || 0;
      }
      
      console.log('🧮 Expected Discount (Frontend calc):', expectedDiscount);
      console.log('🌐 Actual Discount (Backend response):', backendData.promotionDiscount);
      
      // Check if backend exceeded maxValue
      if (promoCode.maxDiscountValue && backendData.promotionDiscount > promoCode.maxDiscountValue) {
        console.error('🚨 [BACKEND ERROR] Discount exceeds maxValue!', {
          backendDiscount: backendData.promotionDiscount,
          maxValue: promoCode.maxDiscountValue,
          difference: backendData.promotionDiscount - promoCode.maxDiscountValue
        });
      }
      
      // Check calculation accuracy
      const discountDifference = Math.abs(expectedDiscount - backendData.promotionDiscount);
      if (discountDifference > 1) { // Allow 1 VND tolerance for rounding
        console.warn('⚠️ [CALCULATION MISMATCH]', {
          frontendExpected: expectedDiscount,
          backendActual: backendData.promotionDiscount,
          difference: discountDifference
        });
      }
    }
    
    setAppliedPromo(promoCode);
    
    if (promoCode && backendData) {
      // 🎯 SỬ DỤNG DỮ LIỆU TỪ BACKEND THAY VÌ TÍNH TOÁN FRONTEND
      setUpdatedInvoice({
        ...invoice,
        finalAmountBeforeTax: Number(backendData.finalAmountBeforeTax || invoice.finalAmountBeforeTax),
        finalAmountAfterTax: Number(backendData.finalAmountAfterTax || invoice.finalAmountAfterTax),
        finalAmountAfterTaxAndPromotion: Number(backendData.finalAmountAfterTaxAndPromotion || invoice.finalAmountAfterTaxAndPromotion),
        promotionDiscount: Number(backendData.promotionDiscount || 0),
        taxAmount: Number(backendData.taxAmount || invoice.taxAmount),
        discount: Number(backendData.discount || invoice.discount)
      });
      
      // 🔄 NEW: Update main invoice state in POSPage
      onPromoUpdate(backendData);
    } else {
      setUpdatedInvoice(invoice);
      // Clear promo data in main state
      onPromoUpdate(null);
    }
  };

  // 🔄 NEW: Calculate promo discount
  const calculatePromoDiscount = (promoCode: PromoCode, amount: number): number => {
    if (promoCode.discountType === 'percent') {
      const discount = (amount * promoCode.percentDiscountValue) / 100;
      return promoCode.maxDiscountValue ? Math.min(discount, promoCode.maxDiscountValue) : discount;
    } else {
      return promoCode.maxDiscountValue || 0;
    }
  };

  // 🔄 NEW: Handle checkout with payment dialog
  const handleCheckout = () => {
    if (invoice.orderDetails.length === 0) {
      alert('Vui lòng thêm sản phẩm vào đơn hàng');
      return;
    }
    
    setShowPaymentDialog(true);
  };

  // 🔄 NEW: Handle payment completion
  const handlePaymentComplete = (completedOrder: CompletedOrder) => {
    setShowPaymentDialog(false);
    setAppliedPromo(null);
    setDiscountCode('');
    onPaymentComplete(completedOrder);
  };

  // Update invoice when original invoice changes
  React.useEffect(() => {
    if (appliedPromo) {
      setUpdatedInvoice({
        ...invoice,
        promotionDiscount: calculatePromoDiscount(appliedPromo, invoice.finalAmountBeforeTax)
      });
    } else {
      setUpdatedInvoice(invoice);
    }
  }, [invoice, appliedPromo]);

  return (
    <>
      <div className="w-72 xl:w-80 bg-white border-l border-gray-200 p-4 lg:p-6 flex flex-col h-full">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
          {/* Cashier Info */}
          <Card className="flex-shrink-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="truncate">Vũ Tiến Đạt</p>
                  <p className="text-sm text-gray-500 truncate">Thu ngân</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{currentTime}</span>
              </div>
            </CardContent>
          </Card>

          {/* 🔄 UPDATED: Promo Code Section */}
          <Card className="flex-shrink-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Mã khuyến mãi</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <PromoCodeSection
                discountCode={discountCode}
                setDiscountCode={setDiscountCode}
                orderAmount={invoice.finalAmountBeforeTax}
                onPromoApplied={handlePromoApplied}
                appliedPromo={appliedPromo}
                orderId={orderId}
              />
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="flex-shrink-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* 🔄 NEW: Display promo discount */}
                
                
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Giảm giá khác:</span>
                    <span>-{formatCurrency(invoice.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Giá trước VAT:</span>
                  <span>{formatCurrency(invoice.finalAmountBeforeTax)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>VAT ({(invoice.taxRate * 100).toFixed(0)}%):</span>
                  <span>{formatCurrency(invoice.taxAmount)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>Cần thanh toán:</span>
                  <span className="text-blue-600">{formatCurrency(invoice.finalAmountAfterTaxAndPromotion)}</span>
                </div>
                
                {invoice.orderDetails.length > 0 && (
                  <div className="mt-4 p-2 bg-gray-50 rounded-md max-h-40 overflow-y-auto">
                    <p className="text-xs text-gray-600 mb-1 sticky top-0 bg-gray-50">Chi tiết ({invoice.orderDetails.length} sản phẩm):</p>
                    <div className="text-xs space-y-1">
                      {invoice.orderDetails.map((item,index) => (
                        <div key={`item-${index}`} className="flex justify-between items-start">
                          <span className="truncate flex-1 mr-2">{item.productName} x{item.quantity}</span>
                          <span className="flex-shrink-0">{formatCurrency(item.totalAmount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fixed Checkout Button at Bottom */}
        <div className="flex-shrink-0 pt-4 border-t bg-white">
          <Button 
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold"
            onClick={handleCheckout}
            disabled={invoice.orderDetails.length === 0}
          >
             THANH TOÁN ({invoice.orderDetails.length})
            <br />
            <span className="text-base font-medium">
              {formatCurrency(invoice.finalAmountAfterTaxAndPromotion)}
            </span>
          </Button>
        </div>
      </div>

      {/* 🔄 NEW: Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <PaymentSection
            invoice={updatedInvoice}
            orderId={orderId}
            onPaymentComplete={handlePaymentComplete}
            onCancel={() => setShowPaymentDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}