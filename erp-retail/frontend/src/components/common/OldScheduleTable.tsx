import React from 'react';

interface Day {
  label: string;
  date: number;
}

interface Employee {
  id: string | number;
  name: string;
  // Bạn có thể thêm các trường khác nếu cần như schedule, salary, v.v.
}

const ScheduleTable: React.FC = () => {
  const days: Day[] = [
    { label: 'Thứ hai', date: 21 },
    { label: 'Thứ ba', date: 22 },
    { label: 'Thứ tư', date: 23 },
    { label: 'Thứ năm', date: 24 },
    { label: 'Thứ sáu', date: 25 },
    { label: 'Thứ bảy', date: 26 },
    { label: 'Chủ nhật', date: 27 },
  ];

  const employees: Employee[] = []; // giả sử chưa có nhân viên

  return (
    <div className="w-full bg-white rounded-xl shadow-md border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lịch làm việc</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm nhân viên"
            className="border rounded-md px-3 py-1 text-sm"
          />
          <button className="border px-3 py-1 text-sm rounded-md">Tuần này</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 border-b text-gray-700">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap font-semibold">Nhân viên</th>
              {days.map((d, idx) => (
                <th key={idx} className="px-4 py-2 whitespace-nowrap">
                  <div className="text-center">
                    <div className={d.date === 24 ? 'text-blue-600 font-semibold' : ''}>
                      {d.label}
                    </div>
                    <div
                      className={
                        d.date === 24
                          ? 'text-white bg-blue-600 rounded-full w-6 h-6 inline-flex items-center justify-center'
                          : ''
                      }
                    >
                      {d.date}
                    </div>
                  </div>
                </th>
              ))}
              <th className="px-4 py-2 whitespace-nowrap font-semibold">Lương dự kiến</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={days.length + 2} className="text-center py-10 text-gray-500">
                  Bạn chưa tạo nhân viên cho cửa hàng. Nhấn{' '}
                  <a href="/employee" className="text-blue-600 underline">
                    vào đây
                  </a>{' '}
                  để tạo nhân viên.
                </td>
              </tr>
            ) : (
              employees.map((emp, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2 font-medium">{emp.name}</td>
                  {days.map((_, i) => (
                    <td key={i} className="px-4 py-2 text-center">Ca sáng</td>
                  ))}
                  <td className="px-4 py-2 text-right">500,000đ</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;
