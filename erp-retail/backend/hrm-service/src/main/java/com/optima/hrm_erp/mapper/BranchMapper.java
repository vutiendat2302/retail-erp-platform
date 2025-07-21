package com.optima.hrm_erp.mapper;

import com.optima.hrm_erp.dto.BranchDto;
import com.optima.hrm_erp.entity.Branch;

public class BranchMapper {
    /*To get data*/
    public static BranchDto toDto(Branch e) {
        if (e == null) return null;
        BranchDto dto = new BranchDto();
        dto.setId(e.getId());
        dto.setName(e.getName());
        dto.setAddress(e.getAddress());
        dto.setStatus(e.getStatus());
        return dto;
    }

    /*To record data*/
    public static Branch toEntity(BranchDto dto) {
        if (dto == null) return null;
        Branch e = new Branch();
        e.setId(dto.getId());
        e.setName(dto.getName());
        e.setAddress(dto.getAddress());
        e.setStatus(dto.getStatus());
        return e;
    }
}
