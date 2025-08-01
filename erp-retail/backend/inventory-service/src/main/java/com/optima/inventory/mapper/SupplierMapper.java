package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.SupplierCreationRequest;
import com.optima.inventory.dto.request.SupplierUpdateRequest;
import com.optima.inventory.dto.response.SupplierResponse;
import com.optima.inventory.entity.SupplierEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SupplierMapper {
    SupplierEntity toSupplier(SupplierCreationRequest request);

    SupplierResponse toSupplierResponse(SupplierEntity supplierEntity);
    void updateSupplier(@MappingTarget SupplierEntity supplierEntity, SupplierUpdateRequest request);
}
