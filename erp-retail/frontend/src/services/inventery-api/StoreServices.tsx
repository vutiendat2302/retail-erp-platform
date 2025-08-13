import api from "./api";

type StoreResponseDto = any;

export const createStore = (data: StoreResponseDto) => api.post('/api/store', data);

export const getStores = () => api.get('/api/store');

export const getStore = (id: string) => api.get(`/api/store/${id}`);

export const updateStore = (id: string, data: StoreResponseDto) => api.put(`/api/store/${id}`, data);

export const deleteStore = (id: string) => api.delete(`/api/store/${id}`);
