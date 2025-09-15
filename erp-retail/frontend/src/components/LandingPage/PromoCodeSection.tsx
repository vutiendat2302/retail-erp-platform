import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronDown, Tag, Percent, DollarSign } from 'lucide-react';
import type { PromoCode } from '../../types/pos';
import { validatePromoCode, usePromoCode } from '../../services/pos-api/PosService';
import { toast } from 'sonner';

interface PromoCodeSectionProps {
  discountCode: string;
  setDiscountCode: (code: string) => void;
  orderAmount: number;
  onPromoApplied: (promoCode: PromoCode | null, backendData?: any) => void;
  appliedPromo: PromoCode | null;
  orderId: string | null; // Required orderId for backend validation
}

// 🔄 NEW: Promo code management component
export default function PromoCodeSection({
  discountCode,
  setDiscountCode,
  orderAmount,
  onPromoApplied,
  appliedPromo,
  orderId
}: PromoCodeSectionProps) {
  const [availablePromoCodes, setAvailablePromoCodes] = useState<PromoCode[]>([]);
  const [isLoadingPromoCodes, setIsLoadingPromoCodes] = useState(false);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [isPromoListOpen, setIsPromoListOpen] = useState(false);

  // Load applicable promo codes for specific order
  const loadPromoCodes = async () => {
    if (!orderId) {
      setAvailablePromoCodes([]); // Không có đơn hàng thì không có mã
      return;
    }
    
    setIsLoadingPromoCodes(true);
    try {
      const response = await usePromoCode(orderId); // Lấy mã applicable cho đơn hàng này
      // Assuming the API returns data in response.data format
      const codes = response.data.data || response;
      setAvailablePromoCodes(codes);
    } catch (error) {
      console.error('Error loading applicable promo codes:', error);
      toast.error('Không thể tải danh sách mã khuyến mãi');
      // Fallback to empty array if API fails
      setAvailablePromoCodes([]);
    } finally {
      setIsLoadingPromoCodes(false);
    }
  };

  useEffect(() => {
    loadPromoCodes(); // Reload khi orderId thay đổi
  }, [orderId]); // Quan trọng: phụ thuộc vào orderId

  // Apply promo code manually
  const handleApplyPromoCode = async () => {
    if (!discountCode.trim()) {
      toast.error('Vui lòng nhập mã khuyến mãi');
      return;
    }

    if (orderAmount <= 0) {
      toast.error('Vui lòng thêm sản phẩm vào đơn hàng trước');
      return;
    }

    if (!orderId) {
      toast.error('Không tìm thấy thông tin đơn hàng');
      return;
    }

    setIsValidatingCode(true);
    try {
      // Call backend API directly with orderId
      const response = await validatePromoCode(orderId, discountCode.trim());
      const validPromo = response.data.data;
      
      if (validPromo && validPromo.success !== false) {
        onPromoApplied(validPromo, response.data.data); // Pass backend data
        toast.success(`✅ Áp dụng mã "${discountCode.trim()}" thành công!`);
      } else {
        onPromoApplied(null);
        toast.error('❌ Mã khuyến mãi không hợp lệ hoặc không đủ điều kiện');
      }
    } catch (error) {
      console.error('Error validating promo code:', error);
      onPromoApplied(null);
      toast.error('❌ Mã khuyến mãi không hợp lệ hoặc không đủ điều kiện');
    } finally {
      setIsValidatingCode(false);
    }
  };

  // Apply promo code from list (simplified since codes are pre-filtered)
  const handleSelectPromoCode = async (promoCode: PromoCode) => {
    if (orderAmount <= 0) {
      toast.error('Vui lòng thêm sản phẩm vào đơn hàng trước');
      return;
    }

    if (!orderId) {
      toast.error('Không tìm thấy thông tin đơn hàng');
      return;
    }

    // Vì mã đã được backend filter sẵn, ta vẫn cần validate để lấy backend data
    try {
      // Call backend API to apply promo code và lấy calculated values
      const response = await validatePromoCode(orderId, promoCode.codePromotion);
      
      if (response.data.data && response.data.data.success !== false) {
        setDiscountCode(promoCode.codePromotion);
        onPromoApplied(promoCode, response.data.data); // Pass backend calculated data
        setIsPromoListOpen(false);
        toast.success(`✅ Áp dụng mã "${promoCode.codePromotion}" thành công!`);
      } else {
        toast.error('❌ Mã khuyến mãi không hợp lệ hoặc không đủ điều kiện');
      }
    } catch (error) {
      console.error('Error applying promo code from list:', error);
      toast.error('❌ Lỗi khi áp dụng mã khuyến mãi');
    }
  };

  // Remove applied promo code
  const handleRemovePromoCode = async () => {
    if (!orderId) {
      toast.error('Không tìm thấy thông tin đơn hàng');
      return;
    }

    try {
      // TODO: Call backend API to remove promo code
      // await removePromoCode(orderId); // You might need to add this API
      
      setDiscountCode('');
      onPromoApplied(null);
      toast.info('Đã bỏ mã khuyến mãi');
    } catch (error) {
      console.error('Error removing promo code:', error);
      toast.error('Lỗi khi bỏ mã khuyến mãi');
    }
  };

  const formatDiscount = (promoCode: PromoCode) => {
    if (promoCode.discountType === 'percent') {
      return `${promoCode.percentDiscountValue}%`;
    } else {
      return `${promoCode.maxDiscountValue?.toLocaleString('vi-VN')}₫`;
    }
  };

  const calculateDiscount = (promoCode: PromoCode, amount: number): number => {
    if (promoCode.discountType === 'percent') {
      const discount = (amount * promoCode.percentDiscountValue) / 100;
      return promoCode.maxDiscountValue ? Math.min(discount, promoCode.maxDiscountValue) : discount;
    } else {
      return promoCode.maxDiscountValue || 0;
    }
  };

  return (
    <div className="space-y-4">
      {/* Manual promo code input */}
      <div className="space-y-2">
        <Label htmlFor="discount-code" className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Mã khuyến mãi
        </Label>
        <div className="flex gap-2">
          <Input
            id="discount-code"
            placeholder="Nhập mã khuyến mãi..."
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyPromoCode()}
            disabled={isValidatingCode}
            className="flex-1"
          />
          <Button 
            onClick={handleApplyPromoCode}
            disabled={isValidatingCode || !discountCode.trim()}
            variant="outline"
            size="sm"
          >
            {isValidatingCode ? 'Đang kiểm tra...' : 'Áp dụng'}
          </Button>
        </div>
      </div>

      {/* Applied promo code display */}
      {appliedPromo && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {appliedPromo.codePromotion}
                </Badge>
                <span className="text-sm">
                  Giảm {formatDiscount(appliedPromo)} = 
                  <span className="font-medium ml-1">
                    -{calculateDiscount(appliedPromo, orderAmount).toLocaleString('vi-VN')}₫
                  </span>
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemovePromoCode}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Bỏ
              </Button>
            </div>
            {appliedPromo.descriptionPromotion && (
              <p className="text-xs text-green-700 mt-1">{appliedPromo.descriptionPromotion}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Available promo codes list */}
      <Collapsible open={isPromoListOpen} onOpenChange={setIsPromoListOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between"
            disabled={isLoadingPromoCodes}
          >
            <span className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              {isLoadingPromoCodes ? 'Đang tải...' : 'Xem mã khuyến mãi có sẵn'}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-2">
          {availablePromoCodes.length === 0 ? (
            <Card>
              <CardContent className="p-3 text-center text-muted-foreground">
                Không có mã khuyến mãi nào
              </CardContent>
            </Card>
          ) : (
            availablePromoCodes.map((promo, index) => {
              const isEligible = !promo.minOrderAmount || orderAmount >= promo.minOrderAmount;
              
              return (
                <Card 
                  key={`promo-${index}-${promo.Id}`}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    !isEligible ? 'opacity-50' : ''
                  } ${appliedPromo?.Id === promo.Id ? 'border-green-200 bg-green-50' : ''}`}
                  onClick={() => isEligible && handleSelectPromoCode(promo)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={appliedPromo?.Id === promo.Id ? "default" : "secondary"}>
                          {promo.codePromotion}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {promo.discountType === 'percent' ? (
                            <Percent className="h-3 w-3" />
                          ) : (
                            <DollarSign className="h-3 w-3" />
                          )}
                          <span className="text-sm font-medium">
                            {formatDiscount(promo)}
                          </span>
                        </div>
                      </div>
                      {!isEligible && promo.minOrderAmount && (
                        <Badge variant="outline" className="text-xs">
                          Tối thiểu {promo.minOrderAmount.toLocaleString('vi-VN')}₫
                        </Badge>
                      )}
                    </div>
                    {promo.descriptionPromotion && (
                      <p className="text-xs text-muted-foreground mt-1">{promo.descriptionPromotion}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}