import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Plus, Edit, Trash2, ToggleLeft, ToggleRight, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import type { PromoCode } from '../types/pos';
import { promoCodeService } from '../services/pos-api/promoCodeService';
import type { PageType } from '../App';

interface PromoCodeManagementPageProps {
  onNavigate: (page: PageType) => void;
}

interface PromoCodeFormData {
  codePromotion: string;
  discountType: 'percent' | 'fixed';
  percentDiscountValue: number;
  minOrderAmount: number;
  maxDiscountValue: number;
  isActive: boolean;
  descriptionPromotion?: string;
}

export default function PromoCodeManagementPage({ onNavigate }: PromoCodeManagementPageProps) {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [filteredPromoCodes, setFilteredPromoCodes] = useState<PromoCode[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPromoCode, setEditingPromoCode] = useState<PromoCode | null>(null);
  const [formData, setFormData] = useState<PromoCodeFormData>({
    codePromotion: '',
    discountType: 'percent',
    percentDiscountValue: 0,
    minOrderAmount: 0,
    maxDiscountValue: 0,
    isActive: true,
    descriptionPromotion: ''
  });

  // Load promo codes on component mount
  useEffect(() => {
    loadPromoCodes();
  }, []);

  // Filter promo codes based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPromoCodes(promoCodes);
    } else {
      const filtered = promoCodes.filter(promo =>
        promo.codePromotion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.descriptionPromotion?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPromoCodes(filtered);
    }
  }, [searchTerm, promoCodes]);

  const loadPromoCodes = async () => {
    try {
      setIsLoading(true);
      const data = await promoCodeService.getAllPromoCodes();
      setPromoCodes(data);
      setFilteredPromoCodes(data);
    } catch (error) {
      console.error('Error loading promo codes:', error);
      toast.error('Không thể tải danh sách mã khuyến mãi');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      codePromotion: '',
      discountType: 'percent',
      percentDiscountValue: 0,
      minOrderAmount: 0,
      maxDiscountValue: 0,
      isActive: true,
      descriptionPromotion: ''
    });
    setEditingPromoCode(null);
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (!formData.codePromotion.trim()) {
        toast.error('Vui lòng nhập mã khuyến mãi');
        return;
      }

      if (formData.percentDiscountValue <= 0) {
        toast.error('Giá trị giảm giá phải lớn hơn 0');
        return;
      }

      if (editingPromoCode) {
        // Update existing promo code
        const updated = await promoCodeService.updatePromoCode(editingPromoCode.Id, formData);
        setPromoCodes(prev => prev.map(promo => 
          promo.Id === editingPromoCode.Id ? updated : promo
        ));
        toast.success('Mã khuyến mãi đã được cập nhật');
      } else {
        // Create new promo code
        const newPromoCode = await promoCodeService.createPromoCode(formData);
        setPromoCodes(prev => [newPromoCode, ...prev]);
        toast.success('Mã khuyến mãi đã được tạo thành công');
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error(editingPromoCode ? 'Không thể cập nhật mã khuyến mãi' : 'Không thể tạo mã khuyến mãi');
    }
  };

  const handleEdit = (promoCode: PromoCode) => {
    setEditingPromoCode(promoCode);
    setFormData({
      codePromotion: promoCode.codePromotion,
      discountType: promoCode.discountType,
      percentDiscountValue: typeof promoCode.percentDiscountValue === 'number' && !isNaN(promoCode.percentDiscountValue) ? promoCode.percentDiscountValue : 0,
      minOrderAmount: typeof promoCode.minOrderAmount === 'number' && !isNaN(promoCode.minOrderAmount) ? promoCode.minOrderAmount : 0,
      maxDiscountValue: typeof promoCode.maxDiscountValue === 'number' && !isNaN(promoCode.maxDiscountValue) ? promoCode.maxDiscountValue : 0,
      isActive: promoCode.isActive,
      descriptionPromotion: promoCode.descriptionPromotion || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (promoId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa mã khuyến mãi này?')) {
      return;
    }

    try {
      await promoCodeService.deletePromoCode(promoId);
      setPromoCodes(prev => prev.filter(promo => promo.Id !== promoId));
      toast.success('Mã khuyến mãi đã được xóa');
    } catch (error) {
      toast.error('Không thể xóa mã khuyến mãi');
    }
  };

  const handleToggleStatus = async (promoCode: PromoCode) => {
    try {
      const updated = await promoCodeService.togglePromoCodeStatus(promoCode.Id);
      setPromoCodes(prev => prev.map(promo => 
        promo.Id === promoCode.Id ? updated : promo
      ));
      toast.success(`Mã khuyến mãi đã được ${updated.isActive ? 'kích hoạt' : 'tạm ngưng'}`);
    } catch (error) {
      toast.error('Không thể thay đổi trạng thái mã khuyến mãi');
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + '₫';
  };

  const PromoCodeDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      setIsDialogOpen(open);
      if (!open) resetForm();
    }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingPromoCode ? 'Chỉnh sửa mã khuyến mãi' : 'Tạo mã khuyến mãi mới'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code">Mã khuyến mãi*</Label>
              <Input
                id="code"
                value={formData.codePromotion}
                onChange={(e) => setFormData(prev => ({ ...prev, codePromotion: e.target.value.toUpperCase() }))}
                placeholder="VD: SAVE10"
                className="uppercase"
              />
            </div>
            <div>
              <Label htmlFor="discountType">Loại giảm giá*</Label>
              <Select 
                value={formData.discountType} 
                onValueChange={(value: 'percent' | 'fixed') => 
                  setFormData(prev => ({ ...prev, discountType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent">Phần trăm (%)</SelectItem>
                  <SelectItem value="fixed">Số tiền cố định (₫)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="discountValue">
                {formData.discountType === 'percent' ? 'Phần trăm giảm (%)' : 'Số tiền giảm (₫)'}*
              </Label>
              <Input
                id="discountValue"
                type="number"
                min="0"
                value={formData.percentDiscountValue === 0 ? '' : formData.percentDiscountValue}  // <-- Thêm .toString()
                onChange={(e) => {
                const value = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  percentDiscountValue: value === '' ? 0 : Math.max(0, Number(value))
                  }));
              }}  
              placeholder={formData.discountType === 'percent' ? "10" : "15000"}
              />
            </div>
            <div>
              <Label htmlFor="minOrder">Đơn hàng tối thiểu (₫)</Label>
              <Input
                id="minOrder"
                type="number"
                min="0"
                value={formData.minOrderAmount === 0 ? '' : formData.minOrderAmount.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    minOrderAmount: value === '' ? 0 : Math.max(0, Number(value))
                  }));
                }}
                placeholder="50000"
              />
            </div>
          </div>

          {formData.discountType === 'percent' && (
            <div>
              <Label htmlFor="maxDiscount">Giảm tối đa (₫)</Label>
              <Input
                id="maxDiscount"
                type="number"
                min="0"
                value={formData.maxDiscountValue === 0 ? '' : formData.maxDiscountValue.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    maxDiscountValue: value === '' ? 0 : Math.max(0, Number(value))
                  }));
                }}
                placeholder="20000"
              />
            </div>
          )}

          <div>
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={formData.descriptionPromotion}
              onChange={(e) => setFormData(prev => ({ ...prev, descriptionPromotion: e.target.value }))}
              placeholder="Mô tả chi tiết về mã khuyến mãi..."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
            <Label>Kích hoạt mã khuyến mãi</Label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleCreateOrUpdate}>
            {editingPromoCode ? 'Cập nhật' : 'Tạo mã'}
          </Button>
        </div>
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
    <div className="min-h-screen  w-screen">
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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý mã khuyến mãi</h1>
              <p className="text-gray-600">Tạo và quản lý các mã khuyến mãi cho hệ thống</p>
            </div>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Tạo mã mới
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm theo mã hoặc mô tả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{filteredPromoCodes.length}</p>
                <p className="text-sm text-gray-600">Tổng mã KM</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {filteredPromoCodes.filter(p => p.isActive).length}
                </p>
                <p className="text-sm text-gray-600">Đang hoạt động</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Promo Codes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách mã khuyến mãi</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPromoCodes.length === 0 ? (
              <div className="text-center py-8">
                <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {searchTerm ? 'Không tìm thấy mã khuyến mãi nào' : 'Chưa có mã khuyến mãi nào'}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã khuyến mãi</TableHead>
                    <TableHead>Loại giảm giá</TableHead>
                    <TableHead>Giá trị</TableHead>
                    <TableHead>Đơn tối thiểu</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead className="text-center">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPromoCodes.map((promo) => (
                    <TableRow key={promo.Id}>
                      <TableCell className="font-bold text-blue-600">{promo.codePromotion}</TableCell>
                      <TableCell>
                        <Badge
                          className={promo.discountType === "percent" ? "bg-blue-500 text-white hover:bg-blue-300" : ""}
                          variant={promo.discountType === "percent" ? "default" : "secondary"}
                        >
                          {promo.discountType === "percent" ? "Phần trăm" : "Cố định"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {promo.discountType === 'percent'
                        ? `${promo.percentDiscountValue}%`
                        : promo.discountType === 'fixed'
                        ? promo.maxDiscountValue && !isNaN(Number(promo.maxDiscountValue))
                        ? formatCurrency(Number(promo.maxDiscountValue))
                        : '-'
                        : '-'
                      }
  {promo.discountType === 'percent' && promo.maxDiscountValue && (
    <div className="text-xs text-gray-500">
      Tối đa: {promo.maxDiscountValue && !isNaN(Number(promo.maxDiscountValue))
        ? formatCurrency(Number(promo.maxDiscountValue))
        : '-'}
    </div>
  )}
</TableCell>
                      <TableCell>
                        {promo.minOrderAmount ? formatCurrency(promo.minOrderAmount) : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={promo.isActive ? "bg-blue-500 text-white hover:bg-blue-500" : ""}
                          variant={promo.isActive ? "default" : "secondary"}
                          >
                          {promo.isActive ? "Hoạt động" : "Tạm ngưng"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {promo.descriptionPromotion || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(promo)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(promo)}
                          >
                            {promo.isActive ? (
                              <ToggleRight className="h-4 w-4 text-green-600" />
                            ) : (
                              <ToggleLeft className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(promo.Id)}
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

      <PromoCodeDialog />
    </div>
  );
}