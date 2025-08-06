package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.CategoryRequestDto;
import com.optima.inventory.dto.response.CategoryResponseDto;
import com.optima.inventory.entity.CategoryEntity;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(target = "id", ignore = true)
    CategoryEntity toCategory(CategoryRequestDto request);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCategory(@MappingTarget CategoryEntity categoryEntity, CategoryRequestDto request);

    CategoryResponseDto toCategoryResponseDto(CategoryEntity categoryEntity);
}
