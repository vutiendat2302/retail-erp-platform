package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.ManufacturingLocationCreationRequest;
import com.optima.inventory.dto.request.ManufacturingLocationUpdateRequest;
import com.optima.inventory.dto.response.ManufacturingLocationResponse;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ManufacturingLocationMapper {
    ManufacturingLocationEntity toManufacturingLocation(ManufacturingLocationCreationRequest request);

    ManufacturingLocationResponse toManufacturingLocationResponse(ManufacturingLocationEntity manufacturingLocationEntity);
    void updateManufacturingLocation(@MappingTarget ManufacturingLocationEntity manufacturingLocationEntity, ManufacturingLocationUpdateRequest request);
}
