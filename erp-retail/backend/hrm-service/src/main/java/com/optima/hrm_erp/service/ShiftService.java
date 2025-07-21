package com.optima.hrm_erp.service;

import com.optima.hrm_erp.dto.ShiftDto;
import java.util.List;

public interface ShiftService {
    /*CRUD API*/
    List<ShiftDto> getAll();
    ShiftDto getById(Long id);
    ShiftDto create(ShiftDto dto);
    ShiftDto update(Long id, ShiftDto dto);
    void delete(Long id);
}
