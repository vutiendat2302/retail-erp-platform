package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.CategoryRequestDto;
import com.optima.inventory.dto.response.CategoryNameResponse;
import com.optima.inventory.dto.response.CategoryResponseDto;
import com.optima.inventory.dto.response.ProductResponseDto;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.entity.ProductEntity;
import com.optima.inventory.repository.CategoryRepository;
import com.optima.inventory.repository.ProductRepository;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(target = "id", ignore = true)
    CategoryEntity toCategory(CategoryResponseDto categoryResponseDto);

    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCategory(@MappingTarget CategoryEntity categoryEntity, CategoryResponseDto categoryResponseDto);

    CategoryResponseDto toCategoryResponseDto(CategoryEntity categoryEntity);

    CategoryNameResponse toCategoryName(CategoryRepository.CategoryNameView view);

    @Mapping(source = "id", target = "id")
    CategoryResponseDto fromProjection(CategoryRepository.CategoryView view);
}
