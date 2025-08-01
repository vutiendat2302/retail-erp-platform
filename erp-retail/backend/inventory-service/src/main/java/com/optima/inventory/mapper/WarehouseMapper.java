package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.WarehouseCreationRequest;
import com.optima.inventory.dto.request.WarehouseUpdateRequest;
import com.optima.inventory.dto.response.WarehouseResponse;
import com.optima.inventory.entity.WarehouseEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface WarehouseMapper {
    WarehouseEntity toWarehouse(WarehouseCreationRequest request);

    WarehouseResponse toWarehouseResponse(WarehouseEntity warehouseEntity);
    void updateWarehouse(@MappingTarget WarehouseEntity warehouseEntity, WarehouseUpdateRequest request);
}
