# Backend - Retail ERP Platform

## Hướng dẫn chạy backend bằng Docker

### Yêu cầu
- Đã cài đặt Docker và Docker Compose

### Các bước thực hiện

1. Clone repository
```
git clone https://github.com/tdattm/retail-erp-platform.git
cd retail-erp-platform/erp-retail/backend
```

2. Tạo file cấu hình môi trường (nếu có)
- Tùy vào dự án, bạn có thể cần tạo file `.env` hoặc chỉnh sửa các file cấu hình tương ứng.

3. Chạy backend bằng Docker Compose
```
docker-compose up --build
```

4. Truy cập backend
- Mặc định backend sẽ chạy ở địa chỉ: `http://localhost:8000` hoặc cổng bạn đã cấu hình trong `docker-compose.yml`.

### Một số lệnh Docker hữu ích
- Dừng container:
```
docker-compose down
```
- Xem logs:
```
docker-compose logs
```

### Ghi chú
- Đảm bảo các service backend không trùng cổng với dịch vụ khác trên máy.
- Nếu gặp lỗi, kiểm tra lại cấu hình môi trường và file Docker Compose.

---
Nếu có thắc mắc, liên hệ trực tiếp qua Issues của repository hoặc email hỗ trợ của nhóm phát triển.