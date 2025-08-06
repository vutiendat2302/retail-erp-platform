import React, { useState, useEffect } from 'react';
import EmployeeTable from '../components/common/EmployeeTable';
import EmployeeForm from '../components/common/EmployeeForm';
import {
  getPagedEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../services/hrm-api/emmployeeService';

// Kiểu tạm cho Employee, bạn nên thay bằng kiểu thật nếu có
interface Employee {
  id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
  branchName: string;
  positionName: string;
}

interface EmployeeFormData {
  name: string;
  email: string;
  gender: string;
  status: string;
}

const Employee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    loadEmployees(page);
  }, [page]);

  const loadEmployees = async (pageNum: number) => {
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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Xác nhận xóa nhân viên này?')) return;
    await deleteEmployee(id);

    if (employees.length === 1 && page > 0) {
      setPage(page - 1);
    } else {
      loadEmployees(page);
    }
  };

  const handleEdit = (emp: Employee) => {
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

  const handleFormSubmit = async (data: EmployeeFormData) => {
    if (currentEmployee) {
      await updateEmployee(currentEmployee.id, data);
    } else {
      await createEmployee(data);
    }
    setFormOpen(false);
    loadEmployees(page);
  };

  const goToPage = (newPage: number) => {
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
