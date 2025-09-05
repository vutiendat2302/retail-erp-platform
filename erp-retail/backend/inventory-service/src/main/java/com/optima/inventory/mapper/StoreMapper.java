package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.StoreRequestDto;
import com.optima.inventory.dto.response.StoreResponseDto;
import com.optima.inventory.entity.StoreEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface StoreMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target="createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @Mapping(target  = "status", expression = "java(storeResponseDto.getStatusString().equalsIgnoreCase(\"active\"))")
    StoreEntity toStore(StoreResponseDto storeResponseDto);

    StoreResponseDto toStoreResponseDto(StoreEntity storeEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target="createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target  = "status", expression = "java(storeResponseDto.getStatusString().equalsIgnoreCase(\"active\"))")
    void updateStore(@MappingTarget StoreEntity storeEntity, StoreResponseDto storeResponseDto);

}
