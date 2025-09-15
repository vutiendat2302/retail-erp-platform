import type { CompletedOrder, Invoice } from '../../types/pos';
import { getOrders, getOrderById, deleteOrderById } from './PosService';
import api from './api';
// Order Management API Services
export const orderManagementService = {
  // Get all completed orders
  getAllOrders: async (): Promise<CompletedOrder[]> => {
    try {
      const response = await getOrders();
      return response.data.data;
    } catch (error) {
      console.warn('Error loading orders:', error);
      return [];
    }
  },

  // Get order by ID
  getOrderById: async (orderId: string): Promise<CompletedOrder | null> => {
    try {
      const response = await getOrderById(orderId);
      return response.data.data;
    } catch (error) {
      console.warn('Error loading order:', error);
      return null;
    }
  },
   updateOrder: async (orderId: string, orderData: Partial<CompletedOrder>): Promise<CompletedOrder> => {
    try {
      const response = await api.patch(`/api/orders/${orderId}`, orderData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw new Error('Không thể cập nhật đơn hàng');
    }
  },
  

  // Delete order
  deleteOrder: async (orderId: string): Promise<void> => {
    try {
      await deleteOrderById(orderId);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw new Error('Không thể xóa đơn hàng');
    }
  },
  // Search orders by criteria
  searchOrders: async (searchTerm: string): Promise<CompletedOrder[]> => {
    try {
      const response = await api.get(`/api/orders/search?q=${encodeURIComponent(searchTerm)}`);
      return response.data.data
    } catch (error) {
      console.warn('Backend API unavailable');
      return [];
    }
  },

  // Get orders by date range
  getOrdersByDateRange: async (startDate: string, endDate: string): Promise<CompletedOrder[]> => {
    try {
      const response = await api.get(`/api/orders/range?start=${startDate}&end=${endDate}`);
      return response.data.data;
    } catch (error) {
      console.warn('Backend API unavailable');
      return [];
    }
  }
};
