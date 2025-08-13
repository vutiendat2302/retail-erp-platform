import React, { useState, useEffect} from 'react';
import type { ChangeEvent, FormEvent } from 'react';

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

interface EmployeeFormProps {
  initialData?: Employee | null;
  onSubmit: (data: EmployeeFormData) => void | Promise<void>;
  onClose: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    email: '',
    gender: 'Nam',
    status: 'active',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        gender: initialData.gender || 'Nam',
        status: initialData.status || 'active',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        gender: 'Nam',
        status: 'active',
      });
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl mb-4">
          {initialData ? 'Cập nhật' : 'Thêm'} nhân viên
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên */}
          <div>
            <label className="block mb-1">Tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          {/* Giới tính */}
          <div>
            <label className="block mb-1">Giới tính</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          {/* Trạng thái */}
          <div>
            <label className="block mb-1">Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          {/* Buttons */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {initialData ? 'Lưu' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
