import React, { useState } from "react";
import { Button } from "flowbite-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface Employee {
  id: string | number;
  name: string;
  branchName: string;
}

// Props của component
interface LichLamViecProps {
  employees?: Employee[];
}

// Tên thứ
const weekdays = ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"];

// Danh sách chi nhánh
const BRANCHES = [
  "Chi nhánh Ba Đình",
  "Chi nhánh Hoàn Kiếm",
  "Chi nhánh Tây Hồ",
  "Chi nhánh Long Biên",
  "Chi nhánh Cầu Giấy",
  "Chi nhánh Đống Đa",
  "Chi nhánh Hai Bà Trưng",
  "Chi nhánh Hoàng Mai",
  "Chi nhánh Thanh Xuân",
  "Chi nhánh Nam Từ Liêm",
  "Chi nhánh Hà Đông"
];

// Hàm lấy ngày đầu tuần (Thứ 2)
function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay() || 7;
  if (day !== 1) d.setHours(-24 * (day - 1));
  d.setHours(0, 0, 0, 0);
  return d;
}

// Component chính
const LichLamViec: React.FC<LichLamViecProps> = ({ employees = [] }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedBranch, setSelectedBranch] = useState<string>(BRANCHES[0]);

  const startOfWeek = getStartOfWeek(currentDate);

  const days: Date[] = [...Array(7)].map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    return date;
  });

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return today.toDateString() === date.toDateString();
  };

  const formatDate = (date: Date): string => `${date.getDate()}/${date.getMonth() + 1}`;

  const changeWeek = (offset: number): void => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset * 7);
    setCurrentDate(newDate);
  };

  const filteredEmployees = employees.filter(emp => emp.branchName === selectedBranch);

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Lịch làm việc</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => changeWeek(-1)} color="light">
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
          <div className="font-medium text-gray-700">
            Tuần {formatDate(days[0])} - {formatDate(days[6])}
          </div>
          <Button size="sm" onClick={() => changeWeek(1)} color="light">
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        </div>
        <div>
          <select
            value={selectedBranch}
            onChange={e => setSelectedBranch(e.target.value)}
            className="border px-3 py-2 rounded text-base"
          >
            {BRANCHES.map(branch => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border border-gray-200 rounded-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 border">Nhân viên</th>
              {days.map((day, idx) => (
                <th
                  key={idx}
                  className={`p-3 border ${isToday(day) ? "bg-blue-500 text-white font-bold" : ""}`}
                >
                  {weekdays[idx]}
                  <br />
                  <span className="text-sm font-normal">{day.getDate()}</span>
                </th>
              ))}
              <th className="p-3 border">Lương dự kiến</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-6 text-gray-500">
                  Không có nhân viên ở chi nhánh này.{" "}
                  <a href="/employee" className="text-blue-600 hover:underline">
                    Nhấn vào đây
                  </a>{" "}
                  để tạo nhân viên.
                </td>
              </tr>
            ) : (
              filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td className="p-3 border">{emp.name}</td>
                  {days.map((_, idx) => (
                    <td key={idx} className="p-3 border">—</td>
                  ))}
                  <td className="p-3 border">—</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LichLamViec;
