package com.optima.hrm_erp.service;

import com.optima.hrm_erp.dto.AttendanceDto;

import java.util.List;

public interface AttendanceService {
    /*CRUD API*/
    List<AttendanceDto> getAll();
    AttendanceDto getById(Long id);
    AttendanceDto create(AttendanceDto dto);
    AttendanceDto update(Long id, AttendanceDto dto);
    void delete(Long id);
}
