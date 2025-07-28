package com.optima.hrm_erp.service;

import com.optima.hrm_erp.dto.BranchEmployeeCountDto;
import com.optima.hrm_erp.dto.EmployeeDto;
import com.optima.hrm_erp.dto.EmployeeJoinDateDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Map;

public interface EmployeeService {
    /*CRUD API*/
    List<EmployeeDto> getAll();
    EmployeeDto getById(Long id);
    EmployeeDto create(EmployeeDto dto);
    EmployeeDto update(Long id, EmployeeDto dto);
    void delete(Long id);

    /*Business API*/
    Map<String, Long> countByGender();
    List<EmployeeJoinDateDto> getJoinDates();
    List<BranchEmployeeCountDto> getEmployeeCountByBranch();
    List<EmployeeDto> getEmployeesWithBranchAndPosition();
    Page<EmployeeDto> getAllPaged(Pageable pageable);
    List<EmployeeDto> getFilteredAndSorted(String status, String gender, Sort sort);
}
