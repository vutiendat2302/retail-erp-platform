import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import BigNumber from "bignumber.js";
import { Tabs } from '../components/ui/tabs';
import POSHeader from '../components/LandingPage/POSHeader';
import InvoiceTabs from '../components/LandingPage/InvoiceTabs';
import ProductList from '../components/LandingPage/ProductList';
import OrderNotes from '../components/LandingPage/OrderNotes';
import POSSidebar from '../components/LandingPage/POSSidebar';
import type { orderDetail, Invoice, CompletedOrder } from '../types/pos';

export default function POSPage() {
  const navigate = useNavigate();

  const goToPage = (page: 'pos' | 'orders' | 'promocodes') => {
    switch(page) {
      case 'pos': navigate('/post-of-link'); break;
      case 'orders': navigate('/orders'); break;
      case 'promocodes': navigate('/promocodes'); break;
    }
  };

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
  const [invoices, setInvoices] = useState<Record<string, Invoice>>({
    "invoice-1": {
      Id: "invoice-1",
      orderDetails: [],
      discount: 0,
      promotionDiscount: 0,
      taxAmount: 0,
      taxRate: 0.08,
      finalAmountBeforeTax: 0,
      finalAmountAfterTax: 0,
      finalAmountAfterTaxAndPromotion: 0,
      notes: "",
      status: "pending"
    }
  });
  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>([]);

  const currentInvoice = invoices[activeTab];

  useEffect(() => {
    setCurrentOrderId(backendOrderIds[activeTab] || null);
  }, [activeTab, backendOrderIds]);

  const currentTime = new Date().toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
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
        taxRate: 0.08,
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

  const adjustQuantity = (delta: number) => setQuantity(Math.max(1, quantity + delta));

  // 🎯 Các hàm addProductToInvoice, removeItemFromInvoice, updateItemQuantity, handlePaymentComplete...
  // giữ nguyên, chỉ cần xóa onNavigate bên trong POSHeader

  const handleProductIdSearch = () => {
    if (searchProductId.trim()) {
      // gọi addProductToInvoice
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleProductIdSearch();
  };

  const handleSearchSuggestionSelect = async (productId: string) => {
    // gọi addProductToInvoice
    setSearchProduct("");
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

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      {/* Header */}
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
        onNavigate={goToPage} // ✅ thêm vào

      />

      {/* Nội dung chính + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Content bên trái */}
        <div className="flex-1 flex flex-col p-4 lg:p-6 space-y-4 min-w-0 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <InvoiceTabs invoiceCount={invoiceCount} addNewInvoice={addNewInvoice} />
            <ProductList
              invoiceCount={invoiceCount}
              currentInvoice={currentInvoice}
              onRemoveItem={() => {}}
              onUpdateQuantity={() => {}}
            />
          </Tabs>
          <div className="mt-auto">
            <OrderNotes orderNote={currentInvoice.notes || orderNote} setOrderNote={updateInvoiceNotes} />
          </div>
        </div>

        {/* Sidebar */}
        <POSSidebar
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          currentTime={currentTime}
          invoice={currentInvoice}
          onPaymentComplete={() => {}}
          onPromoUpdate={() => {}}
          orderId={currentOrderId ? currentOrderId.toString() : null}
        />
      </div>
    </div>
  );
}
