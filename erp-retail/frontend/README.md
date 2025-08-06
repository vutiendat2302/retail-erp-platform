## Cách chạy dự án

### 1. Cài đặt Node.js
- Tải và cài đặt [Node.js](https://nodejs.org/) (khuyến nghị bản LTS).

### 2. Cài đặt các package
Mở terminal tại thư mục dự án và chạy:
```sh
npm install
```

### 3. Chạy dự án ở chế độ phát triển
```sh
npm run dev
```
- Truy cập địa chỉ hiển thị trên terminal (http://localhost:5173).

### 4. Build dự án để deploy
```sh
npm run build
```
- Kết quả sẽ nằm trong thư mục `dist/`.

---

## Cấu trúc thư mục chi tiết

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── PieChart.jsx
│   │   │   ├── BranchEmployeeBarChart.jsx
│   │   │   └── ...
│   │   ├── common/
│   │   │   ├── EmployeeTable.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── ScheduleTable.jsx
│   │   │   └── ...
│   │   └── layout/
│   │       ├── MainLayout.jsx
│   │       ├── Navbar.jsx
│   │       └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Employee.jsx
│   │   ├── Schedule.jsx
│   │   ├── Attendance.jsx
│   │   └── ...
│   ├── services/
│   │   ├── employeeService.js
│   │   └── ...
│   ├── utils/
│   │   └── motion.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### Giải thích các thư mục chính
- **public/**: Chứa file HTML gốc.
- **src/components/**: Các component dùng lại, chia theo chức năng (charts, common, layout).
- **src/pages/**: Các trang chính của ứng dụng (Employee, Schedule, Attendance...).
- **src/services/**: Chứa các hàm gọi API backend.
- **src/utils/**: Các hàm tiện ích, animation, v.v.
- **App.jsx**: Cấu hình router và layout tổng.
- **main.jsx**: Điểm khởi động React.
- **tailwind.config.js**: Cấu hình TailwindCSS.
- **vite.config.js**: Cấu hình Vite.

---

## Một số lệnh hữu ích

- **Kiểm tra lỗi cú pháp:**  
  ```sh
  npm run lint
  ```
- **Cài thêm package:**  
  ```sh
  npm install <package-name>
  ```