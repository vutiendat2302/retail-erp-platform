import api from "./api";


type ProductResponseDto = any;

type PageParams = {
    search?: string | null;
    category?: string | null;
    brand?: string | null;
    status?: string | null;
    page?: number;
    size?: number;
    sort?: string;
}

// CRUD
export const createProduct = (data: ProductResponseDto) => api.post('/api/product', data);

export const getProducts = () => api.get('/api/product');

export const getProduct = (id: string) => api.get(`/api/product/${id}`);

export const updateProduct = (id: string, data: ProductResponseDto) => api.put(`/api/product/${id}`, data);

export const deleteProduct = (id: string) => api.delete(`/api/product/${id}`);

export const getCountProductActive = () => api.get(`/api/product/active`);

// Phân trang
export const getPageProducts = ({
    page = 0,
    size = 5,
    sort = 'name,asc',
}: PageParams= {}) => api.get('/api/product/page', {
    params: {page, size, sort},
});

// Get Brand, Category, ManufacturingLocation
export const getCategoryName = () => api.get(`/api/category/name`);
export const getManufacturingName = () => api.get(`/api/manufacturingLocation/name`);
export const getBrandName = () => api.get(`/api/brand/name`);

export const getCountBrandActive = () => api.get(`/api/brand/getCountBrandActive`);
export const getCountCategoryActive = () => api.get(`/api/category/getCountCategoryActive`);

// Search
export const getSearchProducts = ({
    search = null,
    category = null,
    brand = null,
    status = null,
    page = 0,
    size = 5,
    sort = 'name,asc',
}: PageParams = {}) => api.get(`api/product/search`, {
    params: {search, category, brand, status, page, size, sort},
})