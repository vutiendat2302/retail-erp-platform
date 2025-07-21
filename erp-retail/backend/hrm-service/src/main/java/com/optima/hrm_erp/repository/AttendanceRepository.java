package com.optima.hrm_erp.repository;

import com.optima.hrm_erp.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
}
