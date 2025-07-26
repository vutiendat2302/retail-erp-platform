import api from './api';

export const getGenderStats = () => api.get('/api/employees/gender-stat');
export const getJoinDates = () => api.get('/api/employees/join-dates');
export const getEmployeeCountByBranch = () => api.get('/api/employees/branches/employee-count');
export const getEmployeeTable = () => api.get('/api/employees/table-view');
