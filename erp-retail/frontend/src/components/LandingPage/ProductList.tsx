import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TabsContent } from '../ui/tabs';
import { Button } from '../ui/button';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import type { Invoice, orderDetail } from '../../types/pos';
import { toast } from 'sonner';

interface ProductListProps {
  invoiceCount: number;
  currentInvoice: Invoice;
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onQuickAdjustQuantity?: (itemId: string, delta: number) => void; // 🔄 NEW: Quick adjust quantity
}

export default function ProductList({ 
  invoiceCount, 
  currentInvoice, 
  onRemoveItem, 
  onUpdateQuantity,
  onQuickAdjustQuantity
}: ProductListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // 🔄 NEW: Handle quick quantity adjustment with toast notifications
  const handleQuickAdjust = (item: orderDetail, delta: number) => {
    const newQuantity = item.quantity + delta;
    
    if (newQuantity <= 0) {
      onRemoveItem(item.Id);
      // 🔄 MARK: Enhanced toast notification with bigger, bolder text
      toast.success(`🗑️ ĐÃ XÓA SẢN PHẨM`, {
        description: `${item.productName} đã được xóa khỏi đơn hàng`,
        duration: 2000,
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      });
    } else {
      onUpdateQuantity(item.Id, newQuantity);
      
      if (onQuickAdjustQuantity) {
        onQuickAdjustQuantity(item.Id, delta);
      }
      
      // 🔄 MARK: Enhanced toast notification with bigger, bolder text
      const action = delta > 0 ? 'TĂNG' : 'GIẢM';
      const emoji = delta > 0 ? '⬆️' : '⬇️';
      toast.success(`${emoji} ${action} SỐ LƯỢNG`, {
        description: `${item.productName}: ${item.quantity} → ${newQuantity}`,
        duration: 1500,
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      });
    }
  };

  const renderOrderItem = (item: orderDetail) => (
    <div key={item.Id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors">
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{item.productName}</h4>
        <p className="text-xs text-gray-500">ID: {item.Id}</p>
        <p className="text-sm text-blue-600">{formatCurrency(item.price)} x {item.quantity}</p>
      </div>
      
      <div className="flex items-center space-x-2 ml-4">
        {/* 🔄 UPDATED: Enhanced Quantity Controls */}
        <div className="flex items-center border border-gray-200 rounded-md bg-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuickAdjust(item, -1)}
            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Giảm 1"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="px-3 py-1 text-sm font-medium min-w-[2.5rem] text-center border-l border-r border-gray-200">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuickAdjust(item, 1)}
            className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600 transition-colors"
            title="Tăng 1"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        
        {/* Total Price */}
        <div className="text-right min-w-[80px]">
          <p className="text-sm font-medium">{formatCurrency(item.totalAmount)}</p>
        </div>
        
        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onRemoveItem(item.Id);
            // 🔄 MARK: Enhanced toast notification with bigger, bolder text
            toast.success(`🗑️ ĐÃ XÓA SẢN PHẨM`, {
              description: `${item.productName} đã được xóa khỏi đơn hàng`,
              duration: 2000,
              style: {
                fontSize: '16px',
                fontWeight: 'bold'
              }
            });
          }}
          className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Xóa sản phẩm"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 mt-4 min-h-0">
      {Array.from({ length: invoiceCount }, (_, i) => {
        const invoiceId = `invoice-${i + 1}`;
        const invoiceData = invoiceId === currentInvoice.Id ? currentInvoice : { orderDetails: [] };
        
        return (
          <TabsContent key={i + 1} value={invoiceId} className="h-full m-0">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex-shrink-0 pb-3">
                <CardTitle className="text-base lg:text-lg flex items-center justify-between">
                  <span>Danh sách sản phẩm</span>
                  {invoiceData.orderDetails && invoiceData.orderDetails.length > 0 && (
                    <span className="text-sm text-gray-500">
                      ({invoiceData.orderDetails.length} sản phẩm)
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col overflow-hidden">
                {invoiceData.orderDetails && invoiceData.orderDetails.length > 0 ? (
                  <div className="space-y-2 overflow-y-auto flex-1">
                    {invoiceData.orderDetails.map(renderOrderItem)}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <ShoppingBag className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 text-gray-300" />
                      <p className="mb-1">Chưa có sản phẩm nào được chọn</p>
                      <p className="text-sm text-gray-400">Nhập ID sản phẩm để thêm vào đơn hàng</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        );
      })}
    </div>
  );
}