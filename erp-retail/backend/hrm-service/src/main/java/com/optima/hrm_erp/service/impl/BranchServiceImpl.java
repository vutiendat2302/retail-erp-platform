package com.optima.hrm_erp.service.impl;

import com.optima.hrm_erp.dto.BranchDto;
import com.optima.hrm_erp.entity.Branch;
import com.optima.hrm_erp.mapper.BranchMapper;
import com.optima.hrm_erp.repository.BranchRepository;
import com.optima.hrm_erp.service.BranchService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BranchServiceImpl implements BranchService {
    private final BranchRepository repository;

    public BranchServiceImpl(BranchRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<BranchDto> getAll() {
        return repository.findAll()
                .stream()
                .map(BranchMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public BranchDto getById(Long id) {
        Branch branch = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Branch not found"));
        return BranchMapper.toDto(branch);
    }

    @Override
    public BranchDto create(BranchDto dto) {
        Branch saved = repository.save(BranchMapper.toEntity(dto));
        return BranchMapper.toDto(saved);
    }

    @Override
    public BranchDto update(Long id, BranchDto dto) {
        Branch existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Branch not found"));
        existing.setName(dto.getName());
        existing.setAddress(dto.getAddress());
        existing.setStatus(dto.getStatus());
        Branch updated = repository.save(existing);
        return BranchMapper.toDto(updated);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
