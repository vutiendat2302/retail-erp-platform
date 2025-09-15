import api from "./api";
import type {WarehouseResponseDto} from "../../types/InventoryServiceType"

type PageParams = {
  productName?: string | null;
  productBatch?: string | null;
  page?: number;
  size?: number;
  sort?: string;
}

// CRUD Warehouse
export const createWarehouse = (data: WarehouseResponseDto) => api.post('/api/warehouse', data);

export const getWarehouses = () => api.get('/api/warehouse');

export const getWarehouse = (id: string) => api.get(`/api/warehouse/${id}`);

export const updateWarehouse = (id: string, data: WarehouseResponseDto) => api.put(`/api/warehouse/${id}`, data);

export const deleteWarehouse = (id: string) => api.delete(`/api/warehouse/${id}`);

// Inventory
export const getInventories = () => api.get('/api/inventory');

export const getInventoryByNameWarehouse = (id: string) => api.get(`/api/inventory/${id}`);

export const getPageInventory = ({
  page = 0,
  size = 20,
  sort = 'productName, asc'
} : PageParams = {}) => api.get('/api/inventory/page', {
  params: {page, size, sort},
});

export const getTotalPriceNormalByWarehouse = (id: string) => api.get(`/api/inventory/totalPrice/${id}`);
export const getCountProductInWarehouse = (id: string) => api.get(`api/inventory/getCountProductInWarehouse/${id}`);
export const getSumQuantityProductInWarehouse = (id: string) => api.get(`api/inventory/getSumQuantityProductInWarehouse/${id}`);
export const getCountProductsNearExpiry = (id: string) => api.get(`api/inventory/getCountProductsNearExpiry/${id}`);
export const getCountProductsNearOut = (id: string) => api.get(`api/inventory/getCountProductsNearOut/${id}`);

export const getSearchInventory = (id: string, {
  productName = null,
  productBatch = null,
  page= 0,
  size = 5,
  sort = 'productName,asc',
} : PageParams = {}) => api.get(`api/inventory/${id}/search`, {
  params: {productName, productBatch, page, size, sort},
})


// Product Batch
export const getProductBatch = () => api.get(`/api/product_batch/productBatchName`);
