package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.WarehouseRequestDto;
import com.optima.inventory.entity.WarehouseEntity;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface WarehouseMapper {

    WarehouseEntity toWarehouse(WarehouseRequestDto request);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateWarehouse(@MappingTarget WarehouseEntity warehouseEntity, WarehouseRequestDto request);
}
