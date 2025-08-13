package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.SupplierRequestDto;
import com.optima.inventory.entity.SupplierEntity;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface SupplierMapper {
    SupplierEntity toSupplier(SupplierRequestDto request);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateSupplier(@MappingTarget SupplierEntity supplierEntity, SupplierRequestDto request);
}
