package com.optima.hrm_erp.mapper;

import com.optima.hrm_erp.dto.ShiftDto;
import com.optima.hrm_erp.entity.Shift;

public class ShiftMapper {
    public static ShiftDto toDto(Shift s) {
        if (s == null) return null;
        ShiftDto dto = new ShiftDto();
        dto.setId(s.getId());
        dto.setName(s.getName());
        dto.setStartTime(s.getStartTime());
        dto.setEndTime(s.getEndTime());
        dto.setStatus(s.getStatus());
        return dto;
    }

    public static Shift toEntity(ShiftDto dto) {
        if (dto == null) return null;
        Shift s = new Shift();
        s.setId(dto.getId());
        s.setName(dto.getName());
        s.setStartTime(dto.getStartTime());
        s.setEndTime(dto.getEndTime());
        s.setStatus(dto.getStatus());
        return s;
    }
}
