import api from "./api";


type CategoryResponseDto = any;

type PageParams = {
    search?: string | null;
    status?: string | null;
    page?: number;
    size?: number;
    sort?: string;
}

// CRUD
export const createCategory = (data: CategoryResponseDto) => api.post('/api/category', data);

export const getCategories = () => api.get('/api/category');

export const getCategory = (id: string) => api.get(`/api/category/${id}`);

export const updateCategory = (id: string, data: CategoryResponseDto) => api.put(`/api/category/${id}`, data);

export const deleteCategory = (id: string) => api.delete(`/api/category/${id}`);

export const getCountCategoryActive = () => api.get(`/api/category/getCountCategoryActive`);

// Search
export const getSearchCategory = ({
    search = null,
    status = null,
    page = 0,
    size = 5,
    sort = 'name,asc',
}: PageParams = {}) => api.get(`api/category/search`, {
    params: {search, status, page, size, sort},
})