package com.optima.hrm_erp.mapper;

import com.optima.hrm_erp.dto.EmployeeDto;
import com.optima.hrm_erp.entity.Branch;
import com.optima.hrm_erp.entity.Employee;
import com.optima.hrm_erp.entity.JobPosition;
import com.optima.hrm_erp.repository.EmployeeRepository;
import com.optima.hrm_erp.repository.EmployeeRepository.EmployeeViewProjection;

public class EmployeeMapper {
    public static EmployeeDto toDto(Employee e){
        /*To get data*/
        if (e == null) return null;
        EmployeeDto dto = new EmployeeDto();
        dto.setId(e.getId());
        dto.setName(e.getName());
        dto.setEmail(e.getEmail());
        dto.setGender(e.getGender());
        dto.setStatus(e.getStatus());
        return dto;
    }

    public static Employee toEntity(EmployeeDto dto) {
        /*To record data*/
        if (dto == null) return null;
        Employee e = new Employee();
        e.setId(dto.getId());
        e.setName(dto.getName());
        e.setEmail(dto.getEmail());
        e.setGender(dto.getGender());
        e.setStatus(dto.getStatus());
        return e;
    }

    public static EmployeeDto fromProjection(EmployeeViewProjection p) {
        EmployeeDto dto = new EmployeeDto();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setGender(p.getGender());
        dto.setEmail(p.getEmail());
        dto.setStatus(p.getStatus());
        dto.setBranchName(p.getBranchName());
        dto.setPositionName(p.getPositionName());
        return dto;
    }

}
