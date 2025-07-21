package com.optima.hrm_erp.service;

import com.optima.hrm_erp.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    /*CRUD API*/
    List<EmployeeDto> getAll();
    EmployeeDto getById(Long id);
    EmployeeDto create(EmployeeDto dto);
    EmployeeDto update(Long id, EmployeeDto dto);
    void delete(Long id);
}
