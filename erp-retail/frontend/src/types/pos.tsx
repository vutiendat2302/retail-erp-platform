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