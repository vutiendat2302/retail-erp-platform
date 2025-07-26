import React, { useEffect, useState } from 'react';
import { getEmployeeTable } from '../services/employeeService';
import EmployeeTable from '../components/common/EmployeeTable';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEmployeeTable();
        const data = Array.isArray(res.data) ? res.data : res.data.content;
        setEmployees(data);
      } catch (err) {
        console.error('Lỗi API:', err);
      }
    };
    fetchData();
  }, []); // chỉ chạy 1 lần khi component mount

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  return (
    <div className="px-4 md:px-10">
      <h1 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Danh sách nhân viên</h1>

      {/* Bộ chọn số dòng / trang */}
      <div className="mb-4 flex justify-end items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Hiển thị:</label>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border-gray-300 text-sm rounded-md p-1 px-2 focus:ring-teal-500 focus:border-teal-500"
        >
          {[5, 10, 15, 20, 50].map((opt) => (
            <option key={opt} value={opt}>
              {opt} dòng/trang
            </option>
          ))}
        </select>
      </div>

      <EmployeeTable employees={currentEmployees} />

      {/* Phân trang */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-1.5 rounded border text-sm font-medium
              ${currentPage === i + 1 ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Employee;
