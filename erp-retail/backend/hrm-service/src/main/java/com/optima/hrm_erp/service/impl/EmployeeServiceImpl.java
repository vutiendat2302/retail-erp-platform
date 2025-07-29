package com.optima.hrm_erp.service.impl;

import com.optima.hrm_erp.dto.BranchEmployeeCountDto;
import com.optima.hrm_erp.dto.EmployeeDto;
import com.optima.hrm_erp.dto.EmployeeJoinDateDto;
import com.optima.hrm_erp.entity.Employee;
import com.optima.hrm_erp.mapper.EmployeeMapper;
import com.optima.hrm_erp.repository.EmployeeRepository;
import com.optima.hrm_erp.service.EmployeeService;
import com.optima.hrm_erp.repository.EmployeeRepository.EmployeeViewProjection;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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

    @Override
    public Page<EmployeeDto> getAllPaged(Pageable pageable) {
        return repository.findAllIn4(pageable).map(EmployeeMapper::fromProjection);
    }

    @Override
    public List<EmployeeDto> getFilteredAndSorted(String status, String gender, Sort sort) {
        List<EmployeeRepository.EmployeeViewProjection> result = repository.findFiltered(status, gender);

        Comparator<EmployeeViewProjection> comparator = Comparator.comparing(EmployeeViewProjection::getId); // default

        for (Sort.Order order : sort) {
            if (order.getProperty().equalsIgnoreCase("branchName")) {
                comparator = Comparator.comparing(EmployeeViewProjection::getBranchName, Comparator.nullsLast(String::compareToIgnoreCase));
            } else if (order.getProperty().equalsIgnoreCase("positionName")) {
                comparator = Comparator.comparing(EmployeeViewProjection::getPositionName, Comparator.nullsLast(String::compareToIgnoreCase));
            } else if (order.getProperty().equalsIgnoreCase("name")) {
                comparator = Comparator.comparing(EmployeeViewProjection::getName, Comparator.nullsLast(String::compareToIgnoreCase));
            }

            if (order.isDescending()) {
                comparator = comparator.reversed();
            }
        }

        return result.stream()
                .sorted(comparator)
                .map(EmployeeMapper::fromProjection)
                .collect(Collectors.toList());
    }

}
