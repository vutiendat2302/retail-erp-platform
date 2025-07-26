package com.optima.hrm_erp.service.impl;

import com.optima.hrm_erp.dto.BranchEmployeeCountDto;
import com.optima.hrm_erp.dto.EmployeeDto;
import com.optima.hrm_erp.dto.EmployeeJoinDateDto;
import com.optima.hrm_erp.entity.Employee;
import com.optima.hrm_erp.mapper.EmployeeMapper;
import com.optima.hrm_erp.repository.EmployeeRepository;
import com.optima.hrm_erp.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository repository;

    public EmployeeServiceImpl(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<EmployeeDto> getAll() {
        return repository.findAll()
                .stream()
                .map(EmployeeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto getById(Long id) {
        Employee e = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        return EmployeeMapper.toDto(e);
    }

    @Override
    public EmployeeDto create(EmployeeDto dto) {
        Employee saved = repository.save(EmployeeMapper.toEntity(dto));
        return EmployeeMapper.toDto(saved);
    }

    @Override
    public EmployeeDto update(Long id, EmployeeDto dto) {
        Employee existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        existing.setName(dto.getName());
        existing.setEmail(dto.getEmail());
        existing.setGender(dto.getGender());
        existing.setStatus(dto.getStatus());
        Employee updated = repository.save(existing);
        return EmployeeMapper.toDto(updated);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Map<String, Long> countByGender() {
        List<Employee> all = repository.findAll();
        return all.stream()
                .collect(Collectors.groupingBy(
                        e -> {
                            String gender = e.getGender();
                            return (gender == null) ? "Unknown" : gender;
                        },
                        Collectors.counting()
                ));
    }

    @Override
    public List<EmployeeJoinDateDto> getJoinDates() {
        return repository.findEmployeeJoinDates().stream().map(p -> {
            EmployeeJoinDateDto dto = new EmployeeJoinDateDto();
            dto.setId(p.getId());
            dto.setName(p.getName());
            dto.setJoinDate(p.getJoinDate());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<BranchEmployeeCountDto> getEmployeeCountByBranch() {
        return repository.countEmployeesByBranch().stream().map(p -> {
            BranchEmployeeCountDto dto = new BranchEmployeeCountDto();
            dto.setBranchId(p.getBranchId());
            dto.setBranchName(p.getBranchName());
            dto.setAddress(p.getAddress());
            dto.setEmployeeCount(p.getEmployeeCount());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDto> getEmployeesWithBranchAndPosition() {
        return repository.findAllWithBranchAndPosition().stream()
                .map(EmployeeMapper::fromProjection)
                .collect(Collectors.toList());
    }


}
