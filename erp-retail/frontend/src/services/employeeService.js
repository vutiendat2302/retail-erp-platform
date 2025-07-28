import api from './api';

// ===== CRUD cơ bản =====
export const getEmployees = () => axios.get('/api/employees');
export const getEmployeeById = (id) => axios.get(`/api/employees/${id}`);
export const createEmployee = (data) => axios.post('/api/employees', data);
export const updateEmployee = (id, data) => axios.put(`/api/employees/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`/api/employees/${id}`);

// ===== Phân trang =====
export const getPagedEmployees = ({
  page = 0,
  size = 5,
  sort = 'name,asc'
} = {}) =>
  api.get('/api/employees/paged', {
    params: { page, size, sort }
  });

// Nếu cần filter/sort nâng cao:
export const getAdvancedPagedEmployees = (params) =>
  axios.get('/api/employees/paged-advanced', { params });

// Hiển thị dữ liệu bảng và thống kê
export const getEmployeeTable = () => api.get('/api/employees/table-view');
export const getGenderStats = () => api.get('/api/employees/gender-stat');
export const getJoinDates = () => api.get('/api/employees/join-dates');
export const getEmployeeCountByBranch = () => api.get('/api/employees/branches/employee-count');

// Danh sách tham chiếu
export const getBranches = () => api.get('/api/branches');
export const getDepartments = () => api.get('/api/departments');
export const getJobPositions = () => api.get('/api/job-positions');
export const getShifts = () => api.get('/api/shifts');

