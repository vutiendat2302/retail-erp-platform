create table warehouse
(
    id          bigint                         not null
        primary key,
    name        varchar(150)                   not null comment 'Tên kho',
    email       varchar(150)                   not null comment 'Email liên hệ (nếu có)',
    address     varchar(250)                   not null comment 'Địa chỉ kho',
    description varchar(250)                   null comment 'Mô tả thêm (tùy chọn)',
    type        varchar(150) default 'GENERAL' null comment 'Loại kho: chính, phụ, trả hàng, trung chuyển,...',
    status      tinyint(1)   default 1         null comment 'Trạng thái: TRUE = đang hoạt động, FALSE = ngưng dùng',
    create_by   bigint                         not null comment 'Người tạo kho',
    create_at   datetime                       not null,
    update_by   bigint                         null,
    update_at   datetime                       null
)
    comment 'Bảng quản lý thông tin các kho hàng trong hệ thống';

INSERT INTO `optima-project-retail-manager`.warehouse (id, name, email, address, description, type, status, create_by, create_at, update_by, update_at) VALUES (1954794442793070592, 'Kho 1', 'janedang@example.net', '394 Bùi Đường', 'Kho 1 sở hữu vị trí thuận lợi, hỗ trợ vận chuyển nhanh chóng và hiệu quả.', null, 1, 1450492617670998018, '2025-06-06 19:06:48', 1450492617670998019, '2025-08-11 13:38:08');
INSERT INTO `optima-project-retail-manager`.warehouse (id, name, email, address, description, type, status, create_by, create_at, update_by, update_at) VALUES (1954794442805653504, 'Kho 2', 'jane27@example.org', '74 John Khu', 'Kho 2 là kho hàng được trang bị hệ thống quản lý hiện đại, đảm bảo bảo quản hàng hóa tốt nhất.', null, 1, 1450492617670998019, '2025-01-14 17:22:49', 1450492617670998016, '2025-08-11 13:38:08');
INSERT INTO `optima-project-retail-manager`.warehouse (id, name, email, address, description, type, status, create_by, create_at, update_by, update_at) VALUES (1954794442814042112, 'Kho 3', 'johnvu@example.com', '82 John Ngõ', 'Kho 3 là lựa chọn tối ưu cho nhu cầu lưu trữ và phân phối hàng hóa trong khu vực.', null, 1, 1450492617670998018, '2023-08-26 07:45:54', 1450492617670998019, '2025-08-11 13:38:08');
INSERT INTO `optima-project-retail-manager`.warehouse (id, name, email, address, description, type, status, create_by, create_at, update_by, update_at) VALUES (1954794442818236416, 'Kho 4', 'nguyenjane@example.org', '04 Lê Làng', 'Kho 4 cung cấp dịch vụ lưu trữ chuyên nghiệp, phù hợp với nhiều loại hàng hóa đa dạng.', null, 1, 1450492617670998018, '2024-06-02 10:38:26', 1450492617670998017, '2025-08-11 13:38:08');
INSERT INTO `optima-project-retail-manager`.warehouse (id, name, email, address, description, type, status, create_by, create_at, update_by, update_at) VALUES (1954794442822430720, 'Kho 5', 'fpham@example.com', '49 John Tổ', 'Kho 5 tọa lạc tại 49 John Tổ, cung cấp không gian lưu trữ rộng rãi, an toàn và tiện lợi.', null, 1, 1450492617670998020, '2024-11-02 07:41:15', 1450492617670998017, '2025-08-11 13:38:08');
INSERT INTO `optima-project-retail-manager`.warehouse (id, name, email, address, description, type, status, create_by, create_at, update_by, update_at) VALUES (1954794442822430721, 'Kho 6', 'janevu@example.com', '251 Jane Khu', 'Kho 6 tọa lạc tại 251 Jane Khu, cung cấp không gian lưu trữ rộng rãi, an toàn và tiện lợi.', null, 1, 1450492617670998017, '2025-02-04 21:03:42', 1450492617670998016, '2025-08-11 13:38:08');
INSERT INTO `optima-project-retail-manager`.warehouse (id, name, email, address, description, type, status, create_by, create_at, update_by, update_at) VALUES (1954794442826625024, 'Kho 7', 'ymai@example.org', '58 John Số', 'Kho 7 sở hữu vị trí thuận lợi, hỗ trợ vận chuyển nhanh chóng và hiệu quả.', null, 1, 1450492617670998019, '2024-02-22 18:50:13', 1450492617670998020, '2025-08-11 13:38:08');
INSERT INTO `optima-project-retail-manager`.warehouse (id, name, email, address, description, type, status, create_by, create_at, update_by, update_at) VALUES (1954794442830819328, 'Kho 8', 'john18@example.org', '7 John Làng', 'Kho 8 cung cấp dịch vụ lưu trữ chuyên nghiệp, phù hợp với nhiều loại hàng hóa đa dạng.', null, 1, 1450492617670998020, '2024-06-28 23:08:31', 1450492617670998017, '2025-08-11 13:38:08');
INSERT INTO `optima-project-retail-manager`.warehouse (id, name, email, address, description, type, status, create_by, create_at, update_by, update_at) VALUES (1954794442830819329, 'Kho 9', 'janepham@example.org', '7 Jane Làng', 'Kho 9 tọa lạc tại 7 Jane Làng, cung cấp không gian lưu trữ rộng rãi, an toàn và tiện lợi.', null, 1, 1450492617670998017, '2024-06-13 04:59:03', 1450492617670998020, '2025-08-11 13:38:08');
INSERT INTO `optima-project-retail-manager`.warehouse (id, name, email, address, description, type, status, create_by, create_at, update_by, update_at) VALUES (1954794442835013632, 'Kho 10', 'cmai@example.com', '682 Đặng Ngõ', 'Kho 10 sở hữu vị trí thuận lợi, hỗ trợ vận chuyển nhanh chóng và hiệu quả.', null, 1, 1450492617670998020, '2024-03-16 23:01:05', 1450492617670998018, '2025-08-11 13:38:08');
