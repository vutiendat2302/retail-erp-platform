package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.StoreProductCreationRequest;
import com.optima.inventory.dto.request.StoreProductUpdateRequest;
import com.optima.inventory.dto.response.StoreProductResponse;
import com.optima.inventory.dto.response.StoreResponse;
import com.optima.inventory.entity.StoreProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StoreProductMapper {
    StoreProductEntity toStoreProduct(StoreProductCreationRequest request);

    StoreProductResponse toStoreProductResponse(StoreProductEntity storeProductEntity);
    void updateStoreProduct(@MappingTarget StoreProductEntity storeProductEntity, StoreProductUpdateRequest request);
}
