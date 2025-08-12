package com.optima.inventory.mapper;

import com.optima.inventory.dto.response.WarehouseResponseDto;
import com.optima.inventory.entity.WarehouseEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface WarehouseMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target="createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @Mapping(target  = "status", expression = "java(warehouseResponseDto.getStatusString().equalsIgnoreCase(\"active\"))")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    WarehouseEntity toWarehouse(WarehouseResponseDto warehouseResponseDto);

    WarehouseResponseDto toWarehouseResponseDto(WarehouseEntity warehouseResponseDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target="createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @Mapping(target  = "status", expression = "java(warehouseResponseDto.getStatusString().equalsIgnoreCase(\"active\"))")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateWarehouseResponseDto(@MappingTarget WarehouseEntity warehouseEntity, WarehouseResponseDto warehouseResponseDto);
}
