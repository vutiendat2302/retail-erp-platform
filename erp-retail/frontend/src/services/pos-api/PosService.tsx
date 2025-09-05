import api from './api';
import BigNumber from "bignumber.js";
type PosData = any;
const formatId = (id: string | number): string => {
    return new BigNumber(id).toFixed();
};

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

export const addToCart =  async (data: PosData) => api.post('/api/order/add-to-cart', data);
export const checkout = async (id : string) => api.post(`/api/order/checkout?orderId=${formatId(id)}`);
export const getPromoCodes = async () => api.get('/api/promotion');
export const validatePromoCode = async (orderId: string, code: string) =>  api.patch(`/api/order/${formatId(orderId)}/apply-promotion`, { codePromotion: code });
export const minusQuantity = async (id: string ) => api.patch(`/api/order/minus-quantity?productId=${formatId(id)}`);
export const plusQuantity = async (id: string ) => api.patch(`/api/order/add-quantity?productId=${formatId(id)}`);
export const deleteFromCart = async (id: string ) => api.delete(`/api/order/delete-from-cart?productId=${formatId(id)}`);
export const usePromoCode = async (orderId: string) =>  api.get(`/api/order/${formatId(orderId)}/use-promotion`);
export const searchProduct = async (query: string) => api.get(`/api/search?query=${query}`);