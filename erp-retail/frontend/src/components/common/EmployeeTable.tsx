import React from 'react';

interface Employee {
  id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
  branchName: string;
  positionName: string;
}

interface EmployeeTableProps {
  data: Employee[];
  loading: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Thêm nhân viên
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Tên</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Giới tính</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Chi nhánh</th>
            <th className="px-4 py-2">Chức danh</th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.gender}</td>
                <td className="px-4 py-2">{emp.status}</td>
                <td className="px-4 py-2">{emp.branchName || '—'}</td>
                <td className="px-4 py-2">{emp.positionName || '—'}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => onEdit(emp)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(emp.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
                Không có dữ liệu
              <td colSpan={7} className="px-4 py-6 text-center">
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
