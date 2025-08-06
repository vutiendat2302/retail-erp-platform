package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.BrandRequesDto;
import com.optima.inventory.dto.response.BrandResponseDto;
import com.optima.inventory.entity.BrandEntity;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    @Mapping(target = "id", ignore = true)
    BrandEntity toBrand(BrandRequesDto request);

    BrandResponseDto toBrandResponseDto(BrandEntity brandEntity);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateBrand(@MappingTarget BrandEntity brandEntity, BrandRequesDto request);
}

