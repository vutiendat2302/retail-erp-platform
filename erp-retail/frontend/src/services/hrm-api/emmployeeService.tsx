import api from './api';

type EmployeeData = any;

interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
}

type Params = Record<string, any>;

// ===== CRUD cơ bản =====
export const getEmployees = () => api.get('/api/employees');

export const getEmployeeById = (id: string) => api.get(`/api/employees/${id}`);

export const createEmployee = (data: EmployeeData) => api.post('/api/employees', data);

export const updateEmployee = (id: string, data: EmployeeData) =>
  api.put(`/api/employees/${id}`, data);

export const deleteEmployee = (id: string) => api.delete(`/api/employees/${id}`);

// ===== Phân trang =====
export const getPagedEmployees = ({
  page = 0,
  size = 5,
  sort = 'name,asc',
}: PageParams = {}) =>
  api.get('/api/employees/paged', {
    params: { page, size, sort },
  });

// ===== Filter/sort nâng cao =====
export const getAdvancedPagedEmployees = (params: Params) =>
  api.get('/api/employees/paged-advanced', { params });

// ===== Bảng và thống kê =====
export const getEmployeeTable = () => api.get('/api/employees/table-view');
export const getGenderStats = () => api.get('/api/employees/gender-stat');
export const getJoinDates = () => api.get('/api/employees/join-dates');
export const getEmployeeCountByBranch = () => api.get('/api/employees/branches/employee-count');

// ===== Danh sách tham chiếu =====
export const getBranches = () => api.get('/api/branches');
export const getDepartments = () => api.get('/api/departments');
export const getJobPositions = () => api.get('/api/job-positions');
export const getShifts = () => api.get('/api/shifts');
