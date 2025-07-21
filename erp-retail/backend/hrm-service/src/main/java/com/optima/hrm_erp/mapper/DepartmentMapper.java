package com.optima.hrm_erp.mapper;

import com.optima.hrm_erp.dto.DepartmentDto;
import com.optima.hrm_erp.entity.Department;

public class DepartmentMapper {
    public static DepartmentDto toDto(Department d) {
        if (d == null) return null;
        DepartmentDto dto = new DepartmentDto();
        dto.setId(d.getId());
        dto.setName(d.getName());
        dto.setDescription(d.getDescription());
        dto.setStatus(d.getStatus());
        return dto;
    }

    public static Department toEntity(DepartmentDto dto) {
        if (dto == null) return null;
        Department d = new Department();
        d.setId(dto.getId());
        d.setName(dto.getName());
        d.setDescription(dto.getDescription());
        d.setStatus(dto.getStatus());
        return d;
    }
}
