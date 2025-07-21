package com.optima.hrm_erp.service;

import com.optima.hrm_erp.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {
    /*CRUD API*/
    List<DepartmentDto> getAll();
    DepartmentDto getById(Long id);
    DepartmentDto create(DepartmentDto dto);
    DepartmentDto update(Long id, DepartmentDto dto);
    void delete(Long id);
}
