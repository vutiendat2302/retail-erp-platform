package com.optima.hrm_erp.mapper;

import com.optima.hrm_erp.dto.AttendanceDto;
import com.optima.hrm_erp.entity.Attendance;

public class AttendanceMapper {
    public static AttendanceDto toDto(Attendance e) {
        if (e == null) return null;
        AttendanceDto dto = new AttendanceDto();
        dto.setId(e.getId());
        dto.setEmployeeId(e.getEmployeeId());
        dto.setShiftId(e.getShiftId());
        dto.setAttendanceDate(e.getAttendanceDate());
        dto.setCheckinTime(e.getCheckinTime());
        dto.setCheckoutTime(e.getCheckoutTime());
        dto.setStatus(e.getStatus());
        dto.setCreatedAt(e.getCreatedAt());
        dto.setCreatedBy(e.getCreatedBy());
        dto.setUpdatedAt(e.getUpdatedAt());
        dto.setUpdatedBy(e.getUpdatedBy());
        dto.setEnabled(e.getEnabled());
        return dto;
    }

    public static Attendance toEntity(AttendanceDto dto) {
        if (dto == null) return null;
        Attendance e = new Attendance();
        e.setId(dto.getId());
        e.setEmployeeId(dto.getEmployeeId());
        e.setShiftId(dto.getShiftId());
        e.setAttendanceDate(dto.getAttendanceDate());
        e.setCheckinTime(dto.getCheckinTime());
        e.setCheckoutTime(dto.getCheckoutTime());
        e.setStatus(dto.getStatus());
        e.setCreatedAt(dto.getCreatedAt());
        e.setCreatedBy(dto.getCreatedBy());
        e.setUpdatedAt(dto.getUpdatedAt());
        e.setUpdatedBy(dto.getUpdatedBy());
        e.setEnabled(dto.getEnabled());
        return e;
    }
}
