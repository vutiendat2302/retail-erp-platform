import type { PromoCode } from '../../types/pos';
import { getPromoCodes, getPromoCodesById, createPromoCode, updatePromoCode, deletePromoCode } from './PosService';
import api from './api';
// Promo Code Management API Services
export const promoCodeService = {
  // Get all promo codes
  getAllPromoCodes: async (): Promise<PromoCode[]> => {
    try {
      const response = await getPromoCodes();
      return response.data.data;
    } catch (error) {
      console.warn('Error loading promo codes:', error);
      // Return fallback mock data with correct structure
      return [
        {
          Id: 'fallback_1',
          codePromotion: 'DEMO10',
          discountType: 'percent',
          percentDiscountValue: 10,
          minOrderAmount: 50000,
          maxDiscountValue: 20000,
          isActive: true,
          descriptionPromotion: 'Demo: Giảm 10% tối đa 20k'
        }
      ];
    }
  },

  // Get promo code by ID
  getPromoCodeById: async (promoId: string): Promise<PromoCode | null> => {
    try {
      const response = await getPromoCodesById(promoId);
      return response.data.data;
    } catch (error) {
      console.warn('Error loading promo code:', error);
      return null;
    }
  },

  // Get promo code by code string
  getPromoCodeByCode: async (code: string): Promise<PromoCode | null> => {
    try {
      const response = await api.get(`/api/promocodes/code/${encodeURIComponent(code)}`);
      return response.data.data;
    } catch (error) {
      console.warn('Backend API unavailable');
      return null;
    }
  },

  // Create new promo code
  createPromoCode: async (promoData: Omit<PromoCode, 'Id'>): Promise<PromoCode> => {
    try {
      const response = await createPromoCode(promoData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating promo code:', error);
      throw new Error('Không thể tạo mã khuyến mãi');
    }
  },

  // Update promo code
  updatePromoCode: async (promoId: string, promoData: Partial<PromoCode>): Promise<PromoCode> => {
    try {
      const response = await updatePromoCode(promoId, promoData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating promo code:', error);
      throw new Error('Không thể cập nhật mã khuyến mãi');
    }
  },

  // Delete promo code
  deletePromoCode: async (promoId: string): Promise<void> => {
    try {
      await deletePromoCode(promoId);
    } catch (error) {
      console.error('Error deleting promo code:', error);
      throw new Error('Không thể xóa mã khuyến mãi');
    }
  },

  // Toggle promo code active status
  togglePromoCodeStatus: async (promoId: string): Promise<PromoCode> => {
    try {
      const response = await api.patch(`/api/promocodes/${promoId}/toggle-status`, {});
      return response.data.data;
    } catch (error) {
      console.error('Error toggling promo code status:', error);
      throw new Error('Không thể thay đổi trạng thái mã khuyến mãi');
    }
  },

  // Validate promo code
  validatePromoCode: async (code: string, orderAmount: number): Promise<{ valid: boolean; discount: number; message: string }> => {
    try {
      const response = await api.post('/api/promocodes/validate', { code, orderAmount });
      return response.data.data;
    } catch (error) {
      console.warn('Backend API unavailable');
      return { valid: false, discount: 0, message: 'Không thể xác thực mã khuyến mãi' };
    }
  },

  // Search promo codes
  searchPromoCodes: async (searchTerm: string): Promise<PromoCode[]> => {
    try {
      const response = await api.get(`/api/promocodes/search?q=${encodeURIComponent(searchTerm)}`);
      return response.data.data;
    } catch (error) {
      console.warn('Backend API unavailable');
      return [];
    }
  }
};