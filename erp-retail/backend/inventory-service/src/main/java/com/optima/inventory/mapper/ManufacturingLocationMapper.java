package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.ManufacturingLocationRequestDto;
import com.optima.inventory.dto.response.BrandResponseDto;
import com.optima.inventory.dto.response.ManufacturingLocationResponseDto;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface ManufacturingLocationMapper {
    @Mapping(target = "id", ignore = true)
    ManufacturingLocationEntity toManufacturingLocation(ManufacturingLocationRequestDto request);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateManufacturingLocation(@MappingTarget ManufacturingLocationEntity manufacturingLocationEntity, ManufacturingLocationRequestDto request);

    ManufacturingLocationResponseDto toManufacturingLocationResponseDto(ManufacturingLocationEntity manufacturingLocationEntity);
}
