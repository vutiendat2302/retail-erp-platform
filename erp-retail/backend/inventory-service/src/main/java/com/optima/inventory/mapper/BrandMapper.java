package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.BrandCreationRequest;
import com.optima.inventory.dto.request.BrandUpdateRequest;
import com.optima.inventory.dto.response.BrandResponse;
import com.optima.inventory.entity.BrandEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BrandMapper {
    BrandEntity toBrand(BrandCreationRequest request);

    BrandResponse toBrandResponse(BrandEntity brand);
    void updateBrand(@MappingTarget BrandEntity brandEntity, BrandUpdateRequest request);
}
