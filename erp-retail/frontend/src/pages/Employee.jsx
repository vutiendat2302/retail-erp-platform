import React, { useState, useEffect } from 'react';
import EmployeeTable from '../components/common/EmployeeTable';
import EmployeeForm from '../components/common/EmployeeForm';
import {
  getPagedEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../services/employeeService';

const Employee = () => {
  const [employees, setEmployees]   = useState([]);
  const [page, setPage]             = useState(0);
  const [size]                      = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading]       = useState(false);

  const [formOpen, setFormOpen]           = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  // Load khi mount và khi page thay đổi
  useEffect(() => {
    loadEmployees(page);
  }, [page]);

  const loadEmployees = async pageNum => {
    setLoading(true);
    try {
      const res = await getPagedEmployees({ page: pageNum, size, sort: 'name,asc' });
      setEmployees(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Xác nhận xóa nhân viên này?')) return;
    await deleteEmployee(id);
    // Nếu xóa bản cuối cùng của trang hiện tại và page>0, lùi page
    if (employees.length === 1 && page > 0) {
      setPage(page - 1);
    } else {
      loadEmployees(page);
    }
  };

  const handleEdit = emp => {
    setCurrentEmployee(emp);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setCurrentEmployee(null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormSubmit = async data => {
    if (currentEmployee) {
      await updateEmployee(currentEmployee.id, data);
    } else {
      await createEmployee(data);
    }
    setFormOpen(false);
    loadEmployees(page);
  };

  const goToPage = newPage => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Quản Lý Nhân Viên</h1>

      <EmployeeTable
        data={employees}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Trang <strong>{page + 1}</strong> / <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page + 1 === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {formOpen && (
        <EmployeeForm
          initialData={currentEmployee}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default Employee;
