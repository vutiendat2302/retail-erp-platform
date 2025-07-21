package com.optima.hrm_erp.mapper;

import com.optima.hrm_erp.dto.JobPositionDto;
import com.optima.hrm_erp.entity.JobPosition;

public class JobPositionMapper {
    public static JobPositionDto toDto(JobPosition p) {
        if (p == null) return null;
        JobPositionDto dto = new JobPositionDto();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setStatus(p.getStatus());
        return dto;
    }

    public static JobPosition toEntity(JobPositionDto dto) {
        if (dto == null) return null;
        JobPosition p = new JobPosition();
        p.setId(dto.getId());
        p.setName(dto.getName());
        p.setStatus(dto.getStatus());
        return p;
    }
}
