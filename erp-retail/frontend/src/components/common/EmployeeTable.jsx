import React from 'react';

const EmployeeTable = ({ employees }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg mt-6">
      <table className="min-w-full table-auto text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-6 py-3 border">ID</th>
            <th className="px-6 py-3 border">Name</th>
            <th className="px-6 py-3 border">Email</th>
            <th className="px-6 py-3 border">Gender</th>
            <th className="px-6 py-3 border">Status</th>
            <th className="px-6 py-3 border">Branch</th>
            <th className="px-6 py-3 border">Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{emp.id}</td>
                <td className="px-6 py-4">{emp.name}</td>
                <td className="px-6 py-4">{emp.email}</td>
                <td className="px-6 py-4">{emp.gender}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-sm rounded-full font-medium 
                    ${emp.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4">{emp.branchName}</td>
                <td className="px-6 py-4">{emp.positionName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-400">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
