-- Tạo database
CREATE DATABASE IF NOT EXISTS hrm_ERP CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE hrm_ERP;

-- Bảng branch: thông tin chi nhánh
CREATE TABLE branch (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Mã chi nhánh',
    name VARCHAR(100) COMMENT 'Tên chi nhánh',
    address TEXT COMMENT 'Địa chỉ chi nhánh',
    manager_id BIGINT COMMENT 'ID nhân viên quản lý chi nhánh',
    created_at DATETIME COMMENT 'Ngày tạo',
    created_by BIGINT COMMENT 'Người tạo',
    updated_at DATETIME COMMENT 'Ngày cập nhật',
    updated_by BIGINT COMMENT 'Người cập nhật'
) COMMENT='Bảng lưu thông tin chi nhánh';

-- Bảng department: thông tin phòng ban
CREATE TABLE department (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Mã phòng ban',
    name VARCHAR(100) COMMENT 'Tên phòng ban',
    description TEXT COMMENT 'Mô tả phòng ban',
    manager_id BIGINT COMMENT 'ID trưởng phòng (nhân viên)',
    created_at DATETIME COMMENT 'Ngày tạo',
    created_by BIGINT COMMENT 'Người tạo',
    updated_at DATETIME COMMENT 'Ngày cập nhật',
    updated_by BIGINT COMMENT 'Người cập nhật'
) COMMENT='Bảng lưu thông tin phòng ban';

-- Bảng job_position: thông tin chức danh/chức vụ
CREATE TABLE job_position (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Mã chức danh',
    title VARCHAR(100) COMMENT 'Tên chức danh',
    level VARCHAR(50) COMMENT 'Cấp bậc (Junior, Senior...)',
    description TEXT COMMENT 'Mô tả công việc',
    created_at DATETIME COMMENT 'Ngày tạo',
    created_by BIGINT COMMENT 'Người tạo',
    updated_at DATETIME COMMENT 'Ngày cập nhật',
    updated_by BIGINT COMMENT 'Người cập nhật'
) COMMENT='Bảng lưu thông tin chức danh nhân viên';

-- Bảng shift: thông tin ca làm việc
CREATE TABLE shift (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Mã ca làm',
    name VARCHAR(50) COMMENT 'Tên ca (sáng, chiều, tối...)',
    start_time TIME COMMENT 'Giờ bắt đầu ca',
    end_time TIME COMMENT 'Giờ kết thúc ca',
    wage_per_shift DECIMAL(8,2) COMMENT 'Lương theo ca',
    created_at DATETIME COMMENT 'Ngày tạo',
    created_by BIGINT COMMENT 'Người tạo',
    updated_at DATETIME COMMENT 'Ngày cập nhật',
    updated_by BIGINT COMMENT 'Người cập nhật'
) COMMENT='Bảng lưu thông tin ca làm việc';

-- Bảng employee: thông tin nhân viên
CREATE TABLE employee (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Mã nhân viên',
    name VARCHAR(100) COMMENT 'Họ tên nhân viên',
    email VARCHAR(100) COMMENT 'Email công việc',
    gender VARCHAR(10) COMMENT 'Giới tính',
    date_of_birth DATE COMMENT 'Ngày sinh',
    address TEXT COMMENT 'Địa chỉ liên hệ',
    branch_id BIGINT COMMENT 'ID chi nhánh làm việc',
    department_id BIGINT COMMENT 'ID phòng ban',
    position_id BIGINT COMMENT 'ID chức danh',
    join_date DATE COMMENT 'Ngày vào làm',
    salary_type VARCHAR(10) COMMENT 'Hình thức lương: daily hoặc shift',
    salary_per_day DECIMAL(8,2) COMMENT 'Lương theo ngày',
    status VARCHAR(20) COMMENT 'Trạng thái làm việc (active/inactive)',
    created_at DATETIME COMMENT 'Ngày tạo',
    created_by BIGINT COMMENT 'Người tạo',
    updated_at DATETIME COMMENT 'Ngày cập nhật',
    updated_by BIGINT COMMENT 'Người cập nhật',
    enabled TINYINT(1) COMMENT 'Trạng thái hiệu lực (1: hoạt động, 0: ngưng)',
    FOREIGN KEY (branch_id) REFERENCES branch(id),
    FOREIGN KEY (department_id) REFERENCES department(id),
    FOREIGN KEY (position_id) REFERENCES job_position(id)
) COMMENT='Bảng lưu thông tin nhân viên';

-- Bảng attendance: bảng chấm công
CREATE TABLE attendance (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Mã chấm công',
    employee_id BIGINT COMMENT 'ID nhân viên',
    work_date DATE COMMENT 'Ngày làm việc',
    check_in DATETIME COMMENT 'Giờ vào',
    check_out DATETIME COMMENT 'Giờ ra',
    status VARCHAR(20) COMMENT 'Trạng thái (on_time, late, absent...)',
    source VARCHAR(30) COMMENT 'Nguồn chấm công (web, mobile...)',
    shift_id BIGINT COMMENT 'ID ca làm (nếu có)',
    note TEXT COMMENT 'Ghi chú',
    created_at DATETIME COMMENT 'Thời gian ghi nhận',
    FOREIGN KEY (employee_id) REFERENCES employee(id),
    FOREIGN KEY (shift_id) REFERENCES shift(id)
) COMMENT='Bảng lưu thông tin chấm công nhân viên';

-- Bảng salary: bảng lương
CREATE TABLE salary (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Mã bảng lương',
    employee_id BIGINT COMMENT 'ID nhân viên',
    month INT COMMENT 'Tháng tính lương',
    year INT COMMENT 'Năm tính lương',
    total_work_days INT COMMENT 'Tổng số ngày công (nếu lương theo ngày)',
    total_shifts INT COMMENT 'Tổng số ca làm (nếu lương theo ca)',
    bonus DECIMAL(8,2) COMMENT 'Thưởng',
    penalty DECIMAL(8,2) COMMENT 'Phạt',
    total_salary DECIMAL(10,2) COMMENT 'Tổng lương thực nhận',
    status VARCHAR(20) COMMENT 'Trạng thái: paid, unpaid, processing',
    pay_date DATETIME COMMENT 'Ngày thanh toán',
    created_at DATETIME COMMENT 'Ngày tạo bảng lương',
    created_by BIGINT COMMENT 'Người tạo',
    updated_at DATETIME COMMENT 'Ngày cập nhật',
    updated_by BIGINT COMMENT 'Người cập nhật',
    FOREIGN KEY (employee_id) REFERENCES employee(id)
) COMMENT='Bảng lưu thông tin tính lương hàng tháng';

-- ===== Thêm INDEX cho các khóa ngoại =====
CREATE INDEX idx_employee_branch_id ON employee(branch_id);
CREATE INDEX idx_employee_department_id ON employee(department_id);
CREATE INDEX idx_employee_position_id ON employee(position_id);
CREATE INDEX idx_department_manager_id ON department(manager_id);
CREATE INDEX idx_branch_manager_id ON branch(manager_id);
CREATE INDEX idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX idx_attendance_shift_id ON attendance(shift_id);
CREATE INDEX idx_salary_employee_id ON salary(employee_id);
