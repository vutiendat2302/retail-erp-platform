package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.ProductBatchCreationRequest;
import com.optima.inventory.dto.request.ProductBatchUpdateRequest;
import com.optima.inventory.dto.response.ProductBatchResponse;
import com.optima.inventory.entity.ProductBatchEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductBatchMapper {
    ProductBatchEntity toProductBatch(ProductBatchCreationRequest request);

    ProductBatchResponse toProductBatchResponse(ProductBatchEntity productBatch);
    void updateProductBatch(@MappingTarget ProductBatchEntity productBatch, ProductBatchUpdateRequest request);
}
