package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.StoreProductRequestDto;
import com.optima.inventory.entity.StoreProductEntity;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface StoreProductMapper {
    StoreProductEntity toStoreProduct(StoreProductRequestDto request);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateStoreProduct(@MappingTarget StoreProductEntity storeProductEntity, StoreProductRequestDto request);
}
