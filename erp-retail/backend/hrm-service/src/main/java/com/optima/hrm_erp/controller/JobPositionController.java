package com.optima.hrm_erp.controller;

import com.optima.hrm_erp.dto.JobPositionDto;
import com.optima.hrm_erp.service.JobPositionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-positions")
public class JobPositionController {

    private final JobPositionService service;

    public JobPositionController(JobPositionService service) {
        this.service = service;
    }

    @GetMapping
    public List<JobPositionDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPositionDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<JobPositionDto> create(@RequestBody JobPositionDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobPositionDto> update(@PathVariable Long id,
                                                 @RequestBody JobPositionDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
