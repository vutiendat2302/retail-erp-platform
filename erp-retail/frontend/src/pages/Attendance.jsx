import React from 'react';
import { motion } from 'framer-motion';

const Attendance = () => {
  return (
    <motion.div
      className="mt-10 text-center text-2xl"
      initial={{ opacity: 0, y: 20 }}          // Bắt đầu mờ và trượt xuống
      animate={{ opacity: 1, y: 0 }}           // Hiện ra và trượt lên
      transition={{ duration: 0.6, ease: 'easeOut' }} // Mượt
    >
      Attendance Page is Working!
      <p className="mt-4 text-lg text-gray-600">
        Chức năng điểm danh sẽ sớm được cập nhật.
      </p>
    </motion.div>
  );
};

export default Attendance;
