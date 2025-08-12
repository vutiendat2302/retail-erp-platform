import type Warehouse from "../../pages/Warehouse";
import api from "./api";

type WarehouseResponseDto = any;

// CRUD
export const createWarehouse = (data: WarehouseResponseDto) => api.post('/api/warehouse', data);

export const getWarehouses = () => api.get('/api/warehouse');

export const getWarehouse = (id: string) => api.get(`/api/warehouse/${id}`);

export const updateWarehouse = (id: string, data: WarehouseResponseDto) => api.put(`/api/warehouse/${id}`, data);

export const deleteWarehouse = (id: string) => api.delete(`/api/warehouse/${id}`);

// Inventory
export const getInventories = () => api.get('/api/inventory');

export const getInventoryByNameWarehouse = (id: String) => api.get(`/api/inventory/${id}`);
