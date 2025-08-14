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

2. Chạy backend bằng Docker Compose
```
docker-compose up --build
```

3. Truy cập backend
- Backend của từng service sẽ chạy ở địa chỉ: `http://localhost:abcd` với `abcd` tương ứng đã được cấu hình trong `docker-compose.yml`.

### Một số lệnh Docker hữu ích
- Dừng container:
```
docker-compose down
```
- Xem logs:
```
docker-compose logs
```