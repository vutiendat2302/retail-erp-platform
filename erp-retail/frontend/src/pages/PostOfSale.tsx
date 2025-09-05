import React, { useState,useEffect } from 'react';
import { toast } from 'sonner';
import BigNumber from "bignumber.js";
import { Tabs } from '../components/ui/tabs';
import POSHeader from '../components/pos-components/LandingPage/POSHeader';
import InvoiceTabs from '../components/pos-components/LandingPage/InvoiceTabs';
import ProductList from '../components/pos-components/LandingPage/ProductList';
import OrderNotes from '../components/pos-components/LandingPage/OrderNotes';
import POSSidebar from '../components/pos-components/LandingPage/POSSidebar';

import { addToCart,
          minusQuantity,
          plusQuantity,
          deleteFromCart,
          usePromoCode,
          checkout
 } from '../services/pos-api/PosService';

 export interface Product {
  id: string;
  name: string;
  price: number;
  barcode?: string;
  category?: string;
  stock?: number;
}

export interface orderDetail {
  Id: string;
  productId?: string; // Product ID for API calls
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
}

export interface Invoice extends BaseOrder {
  status : 'pending'
}
export interface PromoCode {
  Id: string;
  codePromotion: string;
  discountType: 'percent' | 'fixed';
  percentDiscountValue: number;
  minOrderAmount?: number;
  maxDiscountValue?: number;
  isActive: boolean;
  descriptionPromotion?: string;
}
export interface BaseOrder {
  Id: string;
  orderDetails: orderDetail[];
  discount: number;
  taxAmount: number;
  taxRate: number;
  finalAmountBeforeTax: number;
  finalAmountAfterTax: number;
  finalAmountAfterTaxAndPromotion: number;
  notes: string;
  promotionDiscount?: number;
}
export interface CompletedOrder extends BaseOrder {
  createdAt: string;
}
export interface SearchResult {
  id: string;
  name: string;
  match_score: number;
  score: number;
  category_id: number;
  sales: number;
}

export default function POSPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("invoice-1");
  const [invoiceCount, setInvoiceCount] = useState(1);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchProductId, setSearchProductId] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [backendOrderIds, setBackendOrderIds] = useState<Record<string, string>>({});
  

  // VAT configuration
  const TAX_RATE = 0.08; // 8% VAT
  // Invoice management
  const [invoices, setInvoices] = useState<Record<string, Invoice>>({
    "invoice-1": {
      Id: "invoice-1",
      orderDetails: [],
      discount: 0,
      promotionDiscount: 0,
      taxAmount: 0,
      taxRate: TAX_RATE,
      finalAmountAfterTax: 0,
      finalAmountAfterTaxAndPromotion: 0,
      finalAmountBeforeTax: 0,
      notes: "",
      status: "pending"
    }
  });

  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>([]);

  const currentInvoice = invoices[activeTab];
  
  // Update current order ID when active tab changes
  useEffect(() => {
    setCurrentOrderId(backendOrderIds[activeTab] || null);
  }, [activeTab, backendOrderIds]);
  const currentTime = new Date().toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const addNewInvoice = () => {
    const newCount = invoiceCount + 1;
    const newInvoiceId = `invoice-${newCount}`;
    
    setInvoices(prev => ({
      ...prev,
      [newInvoiceId]: {
        Id: newInvoiceId,
        orderDetails: [],
        discount: 0,
        promotionDiscount: 0,
        taxAmount: 0,
        taxRate: TAX_RATE,
        finalAmountBeforeTax: 0,
        finalAmountAfterTax: 0,
        finalAmountAfterTaxAndPromotion: 0,
        notes: "",
        status: "pending"
      }
    }));
    
    setInvoiceCount(newCount);
    setActiveTab(newInvoiceId);
  };

  const adjustQuantity = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const addProductToInvoice = async (productId: string, qty: number = 1) => {
    if (!productId.trim()) return;
    
    setIsLoading(true);
    try {
      const productIdBig = new BigNumber(productId.trim());
      const payload = {
        note: orderNote || "",
        orderDetails: [
          {
            productId: productIdBig.toFixed(),
            quantity: qty
          }
        ]
      };

      const productResponse = await addToCart(payload);
      const backendOrder = productResponse.data.data;
      
      if (!backendOrder) {
        toast.error(`Không tìm thấy sản phẩm với ID: ${productId}`);
        return;
      }

      // 🎯 SỬ DỤNG TRỰC TIẾP DỮ LIỆU TỪ BACKEND - KHÔNG TÍNH TOÁN LẠI
      const orderId = new BigNumber(backendOrder.id).toFixed();

      // Lưu orderId để track với backend
      setBackendOrderIds(prev => ({
        ...prev,
        [activeTab]: orderId
      }));

      // Convert backend orderDetails to frontend format
      const updatedOrderDetails: orderDetail[] = backendOrder.orderDetails.map((detail: any) => ({
        Id: new BigNumber(detail.id).toFixed(), // Order detail ID for frontend
        productId: productIdBig.toFixed(), // Use the original productId that user input
        productName: detail.productName,
        quantity: Number(detail.quantity),
        price: Number(detail.price),
        totalAmount: Number(detail.totalAmount)
      }));
      // 🎯 SỬ DỤNG TRỰC TIẾP CÁC GIÁ TRỊ ĐÃ TÍNH TỪ BACKEND
      setInvoices(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          Id: activeTab,
          orderDetails: updatedOrderDetails,
          // Sử dụng trực tiếp các giá trị từ backend
          finalAmountBeforeTax: Number(backendOrder.finalAmountBeforeTax || 0),
          finalAmountAfterTax: Number(backendOrder.finalAmountAfterTax || 0),
          finalAmountAfterTaxAndPromotion: Number(backendOrder.finalAmountAfterTaxAndPromotion || 0),
          taxAmount: Number(backendOrder.taxAmount || 0),
          taxRate: Number(backendOrder.taxRate || TAX_RATE),
          discount: Number(backendOrder.discount || 0),
          promotionDiscount: Number(backendOrder.promotionDiscount || 0),
          notes: backendOrder.note || orderNote
        }
      }));

      // Hiển thị thông tin sản phẩm vừa thêm
      const lastDetail = backendOrder.orderDetails[backendOrder.orderDetails.length - 1];
      toast.success(`✅ ĐÃ THÊM SẢN PHẨM`, {
        description: `${lastDetail.productName} x${lastDetail.quantity}`,
        duration: 2000,
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      });
      
      setSearchProductId("");
      
    } catch (error) {
      toast.error('Lỗi khi thêm sản phẩm vào giỏ hàng');
      console.error('Error adding product to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentComplete = async (completedOrder: CompletedOrder) => {
    try {
      // Process checkout in backend
      const orderId = backendOrderIds[activeTab];
      if (orderId) {
        await checkout(new BigNumber(orderId).toFixed());
      }
      
      // Add to completed orders
      setCompletedOrders(prev => [completedOrder, ...prev]);
      
      // Create new invoice
      addNewInvoice();
      setOrderNote("");
      
      toast.success(` THANH TOÁN THÀNH CÔNG`, {
        description: `Đơn hàng đã được xử lý và tạo hóa đơn mới`,
        duration: 3000,
        style: {
          fontSize: '12px',
          fontWeight: 'bold'
        }
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Lỗi khi xử lý thanh toán');
    }
  };
  const updateInvoiceNotes = (notes: string) => {
    setOrderNote(notes);
    setInvoices(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        notes
      }
    }));
  };
  const removeItemFromInvoice = async (itemId: string) => {
    try {
      // Find the item to get its productId
      const currentItem = invoices[activeTab].orderDetails.find(item => item.Id === itemId);
      if (!currentItem || !currentItem.productId) {
        toast.error('Không tìm thấy thông tin sản phẩm');
        return;
      }

      // Call backend API to remove from cart using productId
      const backendResponse = await deleteFromCart(currentItem.productId);

      // 🎯 SỬ DỤNG TRỰC TIẾP DỮ LIỆU TỪ BACKEND SAU KHI XÓA
      if (backendResponse?.data?.data) {
        const backendOrder = backendResponse.data.data;
        
        // Convert backend orderDetails to frontend format while preserving productId
        const updatedOrderDetails: orderDetail[] = backendOrder.orderDetails.map((detail: any) => {
          // Find existing item to preserve productId
          const existingItem = invoices[activeTab].orderDetails.find(item => 
            new BigNumber(item.Id).isEqualTo(new BigNumber(detail.id))
          );
          
          return {
            Id: new BigNumber(detail.id).toFixed(),
            productId: existingItem?.productId || null, // Preserve existing productId
            productName: detail.productName,
            quantity: Number(detail.quantity),
            price: Number(detail.price),
            totalAmount: Number(detail.totalAmount)
          };
        });

        setInvoices(prev => ({
          ...prev,
          [activeTab]: {
            ...prev[activeTab],
            orderDetails: updatedOrderDetails,
            // Sử dụng trực tiếp các giá trị từ backend
            finalAmountBeforeTax: Number(backendOrder.finalAmountBeforeTax || 0),
            finalAmountAfterTax: Number(backendOrder.finalAmountAfterTax || 0),
            finalAmountAfterTaxAndPromotion: Number(backendOrder.finalAmountAfterTaxAndPromotion || 0),
            taxAmount: Number(backendOrder.taxAmount || 0),
            discount: Number(backendOrder.discount || 0),
            promotionDiscount: Number(backendOrder.promotionDiscount || 0)
          }
        }));
      }
    } catch (error) {
      console.error('Error removing item from invoice:', error);
      toast.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng');
    }
  };

  const updateItemQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItemFromInvoice(itemId);
      return;
    }

    try {
      // Get current item to determine if we need to increase or decrease
      const currentItem = invoices[activeTab].orderDetails.find(item => item.Id === itemId);
      if (!currentItem || !currentItem.productId) {
        toast.error('Không tìm thấy thông tin sản phẩm');
        return;
      }

      const quantityDiff = newQuantity - currentItem.quantity;
      let backendResponse;
      
      if (quantityDiff > 0) {
        // Increase quantity using productId
        for (let i = 0; i < quantityDiff; i++) {
          backendResponse = await plusQuantity(currentItem.productId);
        }
      } else if (quantityDiff < 0) {
        // Decrease quantity using productId
        for (let i = 0; i < Math.abs(quantityDiff); i++) {
          backendResponse = await minusQuantity(currentItem.productId);
        }
      }

      // 🎯 SỬ DỤNG TRỰC TIẾP DỮ LIỆU TỪ BACKEND SAU KHI CẬP NHẬT
      if (backendResponse?.data?.data) {
        const backendOrder = backendResponse.data.data;
        
        // Convert backend orderDetails to frontend format while preserving productId
        const updatedOrderDetails: orderDetail[] = backendOrder.orderDetails.map((detail: any) => {
          // Find existing item to preserve productId
          const existingItem = invoices[activeTab].orderDetails.find(item => 
            new BigNumber(item.Id).isEqualTo(new BigNumber(detail.id))
          );
          
          return {
            Id: new BigNumber(detail.id).toFixed(),
            productId: existingItem?.productId || null, // Preserve existing productId
            productName: detail.productName,
            quantity: Number(detail.quantity),
            price: Number(detail.price),
            totalAmount: Number(detail.totalAmount)
          };
        });

        setInvoices(prev => ({
          ...prev,
          [activeTab]: {
            ...prev[activeTab],
            orderDetails: updatedOrderDetails,
            // Sử dụng trực tiếp các giá trị từ backend
            finalAmountBeforeTax: Number(backendOrder.finalAmountBeforeTax || 0),
            finalAmountAfterTax: Number(backendOrder.finalAmountAfterTax || 0),
            finalAmountAfterTaxAndPromotion: Number(backendOrder.finalAmountAfterTaxAndPromotion || 0),
            taxAmount: Number(backendOrder.taxAmount || 0),
            discount: Number(backendOrder.discount || 0),
            promotionDiscount: Number(backendOrder.promotionDiscount || 0)
          }
        }));
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast.error('Lỗi khi cập nhật số lượng sản phẩm');
    }
  };

  const handleProductIdSearch = () => {
    if (searchProductId.trim()) {
      addProductToInvoice(searchProductId, quantity);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleProductIdSearch();
    }
  };

  const handleSearchSuggestionSelect = (productId: string) => {
    addProductToInvoice(productId, quantity);
    setSearchProduct("");
  }

  // 🔄 NEW: Update invoice when promo is applied
  const handlePromoUpdate = (backendData: any) => {
    if (!backendData) return;
    
    setInvoices(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        // Update với dữ liệu từ backend sau khi apply promo
        finalAmountBeforeTax: Number(backendData.finalAmountBeforeTax || prev[activeTab].finalAmountBeforeTax),
        finalAmountAfterTax: Number(backendData.finalAmountAfterTax || prev[activeTab].finalAmountAfterTax),
        finalAmountAfterTaxAndPromotion: Number(backendData.finalAmountAfterTaxAndPromotion || prev[activeTab].finalAmountAfterTaxAndPromotion),
        promotionDiscount: Number(backendData.promotionDiscount || 0),
        taxAmount: Number(backendData.taxAmount || prev[activeTab].taxAmount),
        discount: Number(backendData.discount || prev[activeTab].discount)
      }
    }));
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      {/* Header luôn cố định trên cùng */}
      <POSHeader
          searchProduct={searchProduct}
          setSearchProduct={setSearchProduct}
          searchProductId={searchProductId}
          setSearchProductId={setSearchProductId}
          quantity={quantity}
          adjustQuantity={adjustQuantity}
          onProductIdSearch={handleProductIdSearch}
          onKeyPress={handleKeyPress}
          isLoading={isLoading}
          onSearchSuggestionSelect={handleSearchSuggestionSelect}
      />
      {/* Nội dung chính + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Content bên trái */}
        <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-4 min-w-0 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <InvoiceTabs
                invoiceCount={invoiceCount}
                addNewInvoice={addNewInvoice} />
            <ProductList 
                invoiceCount={invoiceCount}
                currentInvoice={currentInvoice}
                onRemoveItem={removeItemFromInvoice}
                onUpdateQuantity={updateItemQuantity}
            />
          </Tabs>

          {/* Order Notes dưới cùng */}
          <div className="mt-auto">
            <OrderNotes 
              orderNote={currentInvoice.notes || orderNote} 
              setOrderNote={updateInvoiceNotes}
            />
          </div>
        </div>

        {/* Sidebar bên phải */}
        <POSSidebar
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          currentTime={currentTime}
          invoice={currentInvoice}
          onPaymentComplete={handlePaymentComplete}
          onPromoUpdate={handlePromoUpdate}
          orderId={currentOrderId ? currentOrderId.toString() : null}
        />
      </div>
    </div>
  );
}
