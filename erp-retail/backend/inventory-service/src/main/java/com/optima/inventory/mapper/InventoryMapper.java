package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.InventoryRequestDto;
import com.optima.inventory.entity.InventoryEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

    InventoryEntity toInventory(InventoryRequestDto request);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateInventory(@MappingTarget InventoryEntity inventoryEntity, InventoryRequestDto request);

}

