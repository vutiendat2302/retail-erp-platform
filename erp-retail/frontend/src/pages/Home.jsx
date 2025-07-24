import React from 'react';
import { motion } from 'framer-motion';
import PieChart from '../components/charts/PieChart';
import JoinDateBarChart from '../components/charts/JoinDateBarChart';
import BranchEmployeeBarChart from '../components/charts/BranchEmployeeBarChart';

const Home = () => {
  return (
    <div className="px-4 md:px-10">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-10">
        HRMs – Enterprise Resource Planning (ERP).
      </h1>

      <motion.p
        className="text-xl font-semibold text-center text-gray-600 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Quản lý nhân sự toàn diện, dễ dàng và hiệu quả.
      </motion.p>
        
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột 1: Biểu đồ 1 nhỏ hơn */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">Phân bố giới tính</h2>
            <div className="h-80">
              <PieChart />
            </div>
          </div>
        </div>

        {/* Cột 2: chứa 2 biểu đồ chồng dọc */}
        <div className="col-span-2 grid grid-rows-2 gap-6">
          {/* Biểu đồ A */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">Phân bố nhân viên theo tháng/năm bắt đầu làm</h2>
            <JoinDateBarChart />
          </div>

          {/* Biểu đồ B */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">Số nhân viên theo chi nhánh</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <BranchEmployeeBarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
