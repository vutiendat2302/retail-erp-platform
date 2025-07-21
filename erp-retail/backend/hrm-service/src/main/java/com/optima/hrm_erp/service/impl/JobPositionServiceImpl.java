package com.optima.hrm_erp.service.impl;

import com.optima.hrm_erp.dto.JobPositionDto;
import com.optima.hrm_erp.entity.JobPosition;
import com.optima.hrm_erp.mapper.JobPositionMapper;
import com.optima.hrm_erp.repository.JobPositionRepository;
import com.optima.hrm_erp.service.JobPositionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobPositionServiceImpl implements JobPositionService {

    private final JobPositionRepository repository;

    public JobPositionServiceImpl(JobPositionRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<JobPositionDto> getAll() {
        return repository.findAll().stream()
                .map(JobPositionMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public JobPositionDto getById(Long id) {
        JobPosition p = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Position not found"));
        return JobPositionMapper.toDto(p);
    }

    @Override
    public JobPositionDto create(JobPositionDto dto) {
        JobPosition saved = repository.save(JobPositionMapper.toEntity(dto));
        return JobPositionMapper.toDto(saved);
    }

    @Override
    public JobPositionDto update(Long id, JobPositionDto dto) {
        JobPosition existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Position not found"));
        existing.setName(dto.getName());
        existing.setStatus(dto.getStatus());
        return JobPositionMapper.toDto(repository.save(existing));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
