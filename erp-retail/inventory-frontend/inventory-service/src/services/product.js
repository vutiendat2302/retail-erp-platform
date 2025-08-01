import api from './api'
import axios from 'axios';


// CRUD
export const getProducts = () => api.get('/api/product');
export const getProductId = (id) => api.get(`/api/product/${id}`);
export const createProduct = (data) => api.post('/api/product', data);
export const updateProduct = (id, data) => api.put('/api/product/${id}', data);
export const deleteProduct = (id) => api.delete('/api/product/${id}');

// Phân trang

export const getPageProducts = async (page = 0, size = 50, sort = "name,asc") => {
    try {
        const response = await axios.get("/optima/api/product/paged", {
        params: { page, size, sort }
        });
        console.log("print");
        
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error.response?.data || error.message);
        throw error;
    }
};



