package com.optima.hrm_erp.service.impl;

import com.optima.hrm_erp.dto.DepartmentDto;
import com.optima.hrm_erp.entity.Department;
import com.optima.hrm_erp.mapper.DepartmentMapper;
import com.optima.hrm_erp.repository.DepartmentRepository;
import com.optima.hrm_erp.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository repository;

    public DepartmentServiceImpl(DepartmentRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<DepartmentDto> getAll() {
        return repository.findAll().stream()
                .map(DepartmentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentDto getById(Long id) {
        Department d = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        return DepartmentMapper.toDto(d);
    }

    @Override
    public DepartmentDto create(DepartmentDto dto) {
        Department saved = repository.save(DepartmentMapper.toEntity(dto));
        return DepartmentMapper.toDto(saved);
    }

    @Override
    public DepartmentDto update(Long id, DepartmentDto dto) {
        Department existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());
        existing.setStatus(dto.getStatus());
        Department updated = repository.save(existing);
        return DepartmentMapper.toDto(updated);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
