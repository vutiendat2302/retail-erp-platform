package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.ProductCreationRequest;
import com.optima.inventory.dto.request.ProductUpdateRequest;
import com.optima.inventory.dto.response.ProductResponse;
import com.optima.inventory.entity.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductEntity toProduct(ProductCreationRequest request);

    ProductResponse toProductResponse(ProductEntity product);
    void updateProduct(@MappingTarget ProductEntity product, ProductUpdateRequest request);
}
