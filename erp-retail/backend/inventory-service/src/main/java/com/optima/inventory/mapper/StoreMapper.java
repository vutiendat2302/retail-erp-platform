package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.StoreRequestDto;
import com.optima.inventory.dto.response.StoreResponseDto;
import com.optima.inventory.entity.StoreEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface StoreMapper {
    StoreEntity toStore(StoreRequestDto request);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateStore(@MappingTarget StoreEntity storeEntity, StoreRequestDto request);

}
