package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.StoreCreationRequest;
import com.optima.inventory.dto.request.StoreUpdateRequest;
import com.optima.inventory.dto.response.StoreResponse;
import com.optima.inventory.entity.StoreEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StoreMapper {
    StoreEntity toStore(StoreCreationRequest request);

    StoreResponse toStoreResponse(StoreEntity storeEntity);
    void updateStore(@MappingTarget StoreEntity storeEntity, StoreUpdateRequest request);
}
