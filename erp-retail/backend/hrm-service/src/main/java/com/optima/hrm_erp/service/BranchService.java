package com.optima.hrm_erp.service;

import com.optima.hrm_erp.dto.BranchDto;

import java.util.List;

public interface BranchService {
    /*CRUD API*/
    List<BranchDto> getAll();
    BranchDto getById(Long id);
    BranchDto create(BranchDto dto);
    BranchDto update(Long id, BranchDto dto);
    void delete(Long id);
}
