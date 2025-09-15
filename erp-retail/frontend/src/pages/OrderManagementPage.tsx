import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Edit, Trash2, Eye, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { toast } from 'sonner';
import type { CompletedOrder } from '../types/pos';
import { orderManagementService } from '../services/pos-api/orderManagementService';
import type { PageType } from '../App';

interface OrderManagementPageProps {
  onNavigate: (page: PageType) => void;
}

export default function OrderManagementPage({ onNavigate }: OrderManagementPageProps) {
  const [orders, setOrders] = useState<CompletedOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<CompletedOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<CompletedOrder | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  // Filter orders based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderDetails.some(detail => 
          detail.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const data = await orderManagementService.getAllOrders();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Không thể tải danh sách đơn hàng');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      return;
    }

    try {
      await orderManagementService.deleteOrder(orderId);
      setOrders(prev => prev.filter(order => order.Id !== orderId));
      toast.success('Đơn hàng đã được xóa thành công');
    } catch (error) {
      toast.error('Không thể xóa đơn hàng');
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + '₫';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const OrderDetailsDialog = () => (
    <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Chi tiết đơn hàng #{selectedOrder?.Id}
          </DialogTitle>
        </DialogHeader>
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Mã đơn hàng</label>
                <p className="text-lg font-semibold">{selectedOrder.Id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Thời gian tạo</label>
                <p className="text-lg">{formatDate(selectedOrder.createdAt)}</p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Sản phẩm đã mua</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead className="text-right">Số lượng</TableHead>
                    <TableHead className="text-right">Đơn giá</TableHead>
                    <TableHead className="text-right">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.orderDetails.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.totalAmount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Tổng kết thanh toán</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tổng tiền (chưa VAT):</span>
                  <span className="font-medium">{formatCurrency(selectedOrder.finalAmountBeforeTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (8%):</span>
                  <span className="font-medium">{formatCurrency(selectedOrder.taxAmount)}</span>
                </div>
                {selectedOrder.promotionDiscount && selectedOrder.promotionDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá khuyến mãi:</span>
                    <span className="font-medium">-{formatCurrency(selectedOrder.promotionDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Tổng cộng:</span>
                  <span className="text-blue-600">{formatCurrency(selectedOrder.finalAmountAfterTaxAndPromotion)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div>
                <label className="text-sm font-medium text-gray-600">Ghi chú</label>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedOrder.notes}</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => onNavigate('pos')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại POS
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
              <p className="text-gray-600">Xem và quản lý tất cả đơn hàng đã hoàn thành</p>
            </div>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm theo mã đơn hàng, sản phẩm hoặc ghi chú..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{filteredOrders.length}</p>
                <p className="text-sm text-gray-600">Tổng đơn hàng</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(
                    filteredOrders.reduce((sum, order) => sum + (order.finalAmountAfterTaxAndPromotion || 0), 0)
                  )}
                </p>
                <p className="text-sm text-gray-600">Tổng doanh thu</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {searchTerm ? 'Không tìm thấy đơn hàng nào' : 'Chưa có đơn hàng nào'}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn hàng</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Số lượng SP</TableHead>
                    <TableHead className="text-right">Giảm giá</TableHead>
                    <TableHead className="text-right">Tổng tiền</TableHead>
                    <TableHead>Ghi chú</TableHead>
                    <TableHead className="text-center">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.Id}>
                      <TableCell className="font-medium">{order.Id}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {order.orderDetails.reduce((sum, item) => sum + item.quantity, 0)} SP
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {order.promotionDiscount && order.promotionDiscount > 0 ? (
                          <span className="text-green-600 font-medium">
                            -{formatCurrency(order.promotionDiscount)}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(order.finalAmountAfterTaxAndPromotion)}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {order.notes || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsDetailDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteOrder(order.Id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <OrderDetailsDialog />
    </div>
  );
}