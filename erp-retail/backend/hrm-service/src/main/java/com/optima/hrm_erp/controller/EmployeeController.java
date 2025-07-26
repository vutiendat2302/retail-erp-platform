package com.optima.hrm_erp.controller;

import com.optima.hrm_erp.dto.BranchEmployeeCountDto;
import com.optima.hrm_erp.dto.EmployeeDto;
import com.optima.hrm_erp.dto.EmployeeJoinDateDto;
import com.optima.hrm_erp.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    /*CRUD API*/
    @GetMapping
    public List<EmployeeDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<EmployeeDto> create(@RequestBody EmployeeDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> update(@PathVariable Long id,
                              @RequestBody EmployeeDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    /*Business API*/
    @GetMapping("/gender-stat")
    public ResponseEntity<Map<String, Long>> getGenderStat() {
        return ResponseEntity.ok(service.countByGender());
    }

    @GetMapping("/join-dates")
    public ResponseEntity<List<EmployeeJoinDateDto>> getJoinDates() {
        return ResponseEntity.ok(service.getJoinDates());
    }

    @GetMapping("/branches/employee-count")
    public ResponseEntity<List<BranchEmployeeCountDto>> getEmployeeCountByBranch() {
        return ResponseEntity.ok(service.getEmployeeCountByBranch());
    }

    @GetMapping("/table-view")
    public ResponseEntity<List<EmployeeDto>> getEmployeesWithBranchAndPosition() {
        return ResponseEntity.ok(service.getEmployeesWithBranchAndPosition());
    }
}
