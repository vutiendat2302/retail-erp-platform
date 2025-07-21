package com.optima.hrm_erp.repository;

import com.optima.hrm_erp.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
