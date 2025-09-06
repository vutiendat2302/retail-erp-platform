create table store
(
    id          bigint       not null comment 'Khóa chính, định danh cửa hàng'
        primary key,
    name        varchar(150) null comment 'Tên cửa hàng',
    email       varchar(150) null,
    address     varchar(250) null,
    description varchar(250) null,
    create_by   bigint       null comment 'ID người tạo cửa hàng',
    create_at   datetime     null comment 'Thời gian tạo cửa hàng',
    update_by   bigint       null comment 'ID người cập nhật gần nhất',
    update_at   datetime     null comment 'Thời gian cập nhật gần nhất',
    status      tinyint(1)   null comment 'Trạng thái cửa hàng: true = hoạt động'
)
    comment 'Bảng lưu thông tin các cửa hàng';

INSERT INTO `optima-project-retail-manager`.store (id, name, email, address, description, create_by, create_at, update_by, update_at, status) VALUES (1954794165809623040, 'Cửa hàng 1', 'maijohn@example.net', '97 Hoàng Số', 'Cửa hàng 1 chuyên cung cấp các mặt hàng chất lượng với dịch vụ tận tâm.', 1450492617670998016, '2023-11-08 17:23:22', 1450492617670998017, '2025-08-11 13:37:02', 1);
INSERT INTO `optima-project-retail-manager`.store (id, name, email, address, description, create_by, create_at, update_by, update_at, status) VALUES (1954794165822205952, 'Cửa hàng 2', 'johnduong@example.org', '251 Nguyễn Hẻm', 'Khám phá sản phẩm phong phú tại Cửa hàng 2 với giá cả hợp lý và chính sách ưu đãi.', 1450492617670998016, '2024-07-28 11:17:48', 1450492617670998018, '2025-08-11 13:37:02', 1);
INSERT INTO `optima-project-retail-manager`.store (id, name, email, address, description, create_by, create_at, update_by, update_at, status) VALUES (1954794165826400256, 'Cửa hàng 3', 'janele@example.net', '7 Jane Làng', 'Cửa hàng 3 chuyên cung cấp các mặt hàng chất lượng với dịch vụ tận tâm.', 1450492617670998020, '2025-06-13 16:46:33', 1450492617670998016, '2025-08-11 13:37:02', 1);
INSERT INTO `optima-project-retail-manager`.store (id, name, email, address, description, create_by, create_at, update_by, update_at, status) VALUES (1954794165830594560, 'Cửa hàng 4', 'johndang@example.net', '3 John Ngõ', 'Khám phá sản phẩm phong phú tại Cửa hàng 4 với giá cả hợp lý và chính sách ưu đãi.', 1450492617670998019, '2024-09-12 02:07:21', 1450492617670998018, '2025-08-11 13:37:02', 1);
INSERT INTO `optima-project-retail-manager`.store (id, name, email, address, description, create_by, create_at, update_by, update_at, status) VALUES (1954794165834788864, 'Cửa hàng 5', 'phamjohn@example.net', '21 John Dãy', 'Cửa hàng 5 cam kết mang đến sản phẩm chính hãng và dịch vụ chăm sóc khách hàng tốt.', 1450492617670998017, '2023-10-14 20:40:42', 1450492617670998016, '2025-08-11 13:37:02', 1);
INSERT INTO `optima-project-retail-manager`.store (id, name, email, address, description, create_by, create_at, update_by, update_at, status) VALUES (1954794165834788865, 'Cửa hàng 6', 'gduong@example.com', '0 Jane Tổ', 'Cửa hàng 6 là cửa hàng uy tín, mang đến trải nghiệm mua sắm tuyệt vời.', 1450492617670998018, '2023-11-03 11:56:10', 1450492617670998019, '2025-08-11 13:37:02', 1);
INSERT INTO `optima-project-retail-manager`.store (id, name, email, address, description, create_by, create_at, update_by, update_at, status) VALUES (1954794165838983168, 'Cửa hàng 7', 'jduong@example.com', '84 John Dãy', 'Cửa hàng 7 là cửa hàng uy tín, mang đến trải nghiệm mua sắm tuyệt vời.', 1450492617670998019, '2025-06-24 00:48:01', 1450492617670998019, '2025-08-11 13:37:02', 1);
INSERT INTO `optima-project-retail-manager`.store (id, name, email, address, description, create_by, create_at, update_by, update_at, status) VALUES (1954794165843177472, 'Cửa hàng 8', 'lhoang@example.com', '78 Phạm Làng', 'Cửa hàng 8 – điểm đến tin cậy cho mọi nhu cầu mua sắm của bạn.', 1450492617670998020, '2024-12-11 13:18:12', 1450492617670998017, '2025-08-11 13:37:02', 1);
INSERT INTO `optima-project-retail-manager`.store (id, name, email, address, description, create_by, create_at, update_by, update_at, status) VALUES (1954794165843177473, 'Cửa hàng 9', 'tranjane@example.com', '35 Jane Ngõ', 'Cửa hàng 9 là cửa hàng uy tín, mang đến trải nghiệm mua sắm tuyệt vời.', 1450492617670998019, '2025-02-07 09:53:30', 1450492617670998020, '2025-08-11 13:37:02', 1);
INSERT INTO `optima-project-retail-manager`.store (id, name, email, address, description, create_by, create_at, update_by, update_at, status) VALUES (1954794165847371776, 'Cửa hàng 10', 'jane12@example.org', '66 Bùi Tổ', 'Cửa hàng 10 chuyên cung cấp các mặt hàng chất lượng với dịch vụ tận tâm.', 1450492617670998018, '2025-07-30 08:52:21', 1450492617670998020, '2025-08-11 13:37:02', 1);
