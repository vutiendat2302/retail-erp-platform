package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.CategoryCreationRequest;
import com.optima.inventory.dto.request.CategoryUpdateRequest;
import com.optima.inventory.dto.response.CategoryResponse;
import com.optima.inventory.entity.CategoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryEntity toCategory(CategoryCreationRequest request);

    CategoryResponse toCategoryResponse(CategoryEntity category);
    void updateCategory(@MappingTarget CategoryEntity category, CategoryUpdateRequest request);
}
