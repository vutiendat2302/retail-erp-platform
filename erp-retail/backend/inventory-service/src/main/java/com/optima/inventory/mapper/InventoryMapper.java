package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.InventoryCreationRequest;
import com.optima.inventory.dto.request.InventoryUpdateRequest;
import com.optima.inventory.dto.response.InventoryResponse;
import com.optima.inventory.entity.InventoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface InventoryMapper {
    InventoryEntity toInventory(InventoryCreationRequest request);

    InventoryResponse toInventoryResponse(InventoryEntity inventoryEntity);
    void updateInventory(@MappingTarget InventoryEntity inventoryEntity, InventoryUpdateRequest request);
}
