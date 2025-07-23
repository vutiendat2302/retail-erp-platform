import React from 'react';
import { motion } from 'framer-motion';

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

      {/* Phân trang 2 cột biểu đồ */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Biểu đồ 1 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Employee Distribution</h2>
          {/* Placeholder biểu đồ */}
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">[Chart 1 Placeholder]</span>
          </div>
        </div>

        {/* Biểu đồ 2 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Attendance Overview</h2>
          {/* Placeholder biểu đồ */}
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">[Chart 2 Placeholder]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
