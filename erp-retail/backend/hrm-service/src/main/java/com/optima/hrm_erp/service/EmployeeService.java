package com.optima.hrm_erp.service;

import com.optima.hrm_erp.dto.BranchEmployeeCountDto;
import com.optima.hrm_erp.dto.EmployeeDto;
import com.optima.hrm_erp.dto.EmployeeJoinDateDto;

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

}
