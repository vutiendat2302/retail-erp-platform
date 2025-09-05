package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.InventoryRequestDto;
import com.optima.inventory.dto.response.InventoryResponseDto;
import com.optima.inventory.dto.response.ProductBatchResponseDto;
import com.optima.inventory.dto.response.ProductResponseDto;
import com.optima.inventory.dto.response.WarehouseResponseDto;
import com.optima.inventory.entity.InventoryEntity;
import com.optima.inventory.entity.ProductBatchEntity;
import com.optima.inventory.entity.ProductEntity;
import com.optima.inventory.entity.WarehouseEntity;
import com.optima.inventory.repository.InventoryRepository;
import com.optima.inventory.repository.ProductRepository;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

    @Mapping(target = "id", ignore = true)
    InventoryEntity toInventory(InventoryResponseDto inventoryResponseDto);


    @Mapping(target = "id", ignore = true)
    InventoryResponseDto toInventoryResponseDto(InventoryEntity inventoryEntity);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateInventory(@MappingTarget InventoryEntity inventoryEntity, InventoryResponseDto inventoryResponseDto);

    @Mapping(source = "id", target = "id")
    InventoryResponseDto fromInventory(InventoryRepository.InventoryView view);

}


