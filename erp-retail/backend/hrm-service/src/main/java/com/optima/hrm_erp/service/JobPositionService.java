package com.optima.hrm_erp.service;

import com.optima.hrm_erp.dto.JobPositionDto;
import java.util.List;

public interface JobPositionService {
    /*CRUD API*/
    List<JobPositionDto> getAll();
    JobPositionDto getById(Long id);
    JobPositionDto create(JobPositionDto dto);
    JobPositionDto update(Long id, JobPositionDto dto);
    void delete(Long id);
}
