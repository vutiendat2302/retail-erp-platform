package com.optima.hrm_erp.service.impl;

import com.optima.hrm_erp.dto.AttendanceDto;
import com.optima.hrm_erp.entity.Attendance;
import com.optima.hrm_erp.mapper.AttendanceMapper;
import com.optima.hrm_erp.repository.AttendanceRepository;
import com.optima.hrm_erp.service.AttendanceService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository repository;

    public AttendanceServiceImpl(AttendanceRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<AttendanceDto> getAll() {
        return repository.findAll().stream()
                .map(AttendanceMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public AttendanceDto getById(Long id) {
        return repository.findById(id)
                .map(AttendanceMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));
    }

    @Override
    public AttendanceDto create(AttendanceDto dto) {
        return AttendanceMapper.toDto(repository.save(AttendanceMapper.toEntity(dto)));
    }

    @Override
    public AttendanceDto update(Long id, AttendanceDto dto) {
        Attendance existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));
        existing.setEmployeeId(dto.getEmployeeId());
        existing.setShiftId(dto.getShiftId());
        existing.setAttendanceDate(dto.getAttendanceDate());
        existing.setCheckinTime(dto.getCheckinTime());
        existing.setCheckoutTime(dto.getCheckoutTime());
        existing.setStatus(dto.getStatus());
        existing.setUpdatedAt(dto.getUpdatedAt());
        existing.setUpdatedBy(dto.getUpdatedBy());
        existing.setEnabled(dto.getEnabled());
        return AttendanceMapper.toDto(repository.save(existing));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
