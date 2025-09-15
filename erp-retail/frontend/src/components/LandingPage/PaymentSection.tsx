import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Loader2 } from 'lucide-react';
import type { Invoice, CompletedOrder } from '../../types/pos';
import { checkout } from '../../services/pos-api/PosService';
import { toast } from 'sonner';
import BigNumber from 'bignumber.js';
interface PaymentSectionProps {
  invoice: Invoice;
  orderId: string | null;
  onPaymentComplete: (completedOrder: CompletedOrder) => void;
  onCancel: () => void;
}

// 🔄 NEW: Payment processing component
export default function PaymentSection({ 
  invoice, 
  orderId,
  onPaymentComplete, 
  onCancel 
}: PaymentSectionProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (invoice.finalAmountAfterTaxAndPromotion <= 0) {
      toast.error('Không thể thanh toán đơn hàng trống');
      return;
    }

    if (!orderId) {
      toast.error('Không tìm thấy ID đơn hàng');
      return;
    }

    setIsProcessing(true);
    try {
      // ✅ Use the real backend orderId instead of frontend invoice.Id
      const orderIdBig = new BigNumber(orderId);
      const completedOrderResponse = await checkout(orderIdBig.toFixed());
      const completedOrder = completedOrderResponse.data.data
      // 🔄 MARK: Payment success notification with larger, bolder text
      toast.success('💰 THANH TOÁN THÀNH CÔNG!', {
        description: `Đơn hàng ${completedOrder.Id} đã được tạo`,
        duration: 3000,
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      });
      
      onPaymentComplete(completedOrder);
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('❌ Thanh toán thất bại. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN');



  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Thanh toán</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div className="space-y-2">
          {invoice.promotionDiscount && invoice.promotionDiscount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>-{formatCurrency(invoice.promotionDiscount)}₫</span>
            </div>
          )}
          
          {invoice.discount > 0 && (
            <div className="flex justify-between text-sm text-orange-600">
              <span>Giảm giá khác:</span>
              <span>-{formatCurrency(invoice.discount)}₫</span>
            </div>
          )}

          <div className="flex justify-between text-sm text-gray-600">
            <span>Giá trước VAT:</span>
            <span>{formatCurrency(invoice.finalAmountBeforeTax)}₫</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>VAT ({(invoice.taxRate * 100).toFixed(0)}%):</span>
            <span>{formatCurrency(invoice.taxAmount)}₫</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-semibold text-lg">
            <span>Tổng thanh toán:</span>
            <span className="text-primary">{formatCurrency(invoice.finalAmountAfterTaxAndPromotion)}₫</span>
          </div>
        </div>

        {/* Simple payment note */}
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Nhấn <strong>Thanh toán</strong> để hoàn tất đơn hàng
          </p>
        </div>

        {/* Order Items Summary */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Sản phẩm ({invoice.orderDetails?.length || 0} món)
          </Label>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {invoice.orderDetails?.map((item) => (
              <div key={item.Id} className="flex justify-between text-xs">
                <span className="flex-1 truncate">{item.productName} x{item.quantity}</span>
                <span>{formatCurrency(item.totalAmount)}₫</span>
              </div>
            )) || <p className="text-xs text-gray-500">Không có sản phẩm</p>}
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Ghi chú</Label>
            <p className="text-sm bg-muted p-2 rounded">{invoice.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1"
          >
            Hủy
          </Button>
          <Button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              `Thanh toán ${formatCurrency(invoice.finalAmountAfterTaxAndPromotion)}₫`
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}