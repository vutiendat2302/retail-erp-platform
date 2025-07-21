package com.optima.hrm_erp.service.impl;

import com.optima.hrm_erp.dto.ShiftDto;
import com.optima.hrm_erp.entity.Shift;
import com.optima.hrm_erp.mapper.ShiftMapper;
import com.optima.hrm_erp.repository.ShiftRepository;
import com.optima.hrm_erp.service.ShiftService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShiftServiceImpl implements ShiftService {

    private final ShiftRepository repository;

    public ShiftServiceImpl(ShiftRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ShiftDto> getAll() {
        return repository.findAll().stream()
                .map(ShiftMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ShiftDto getById(Long id) {
        Shift s = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shift not found"));
        return ShiftMapper.toDto(s);
    }

    @Override
    public ShiftDto create(ShiftDto dto) {
        return ShiftMapper.toDto(repository.save(ShiftMapper.toEntity(dto)));
    }

    @Override
    public ShiftDto update(Long id, ShiftDto dto) {
        Shift s = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shift not found"));
        s.setName(dto.getName());
        s.setStartTime(dto.getStartTime());
        s.setEndTime(dto.getEndTime());
        s.setStatus(dto.getStatus());
        return ShiftMapper.toDto(repository.save(s));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
