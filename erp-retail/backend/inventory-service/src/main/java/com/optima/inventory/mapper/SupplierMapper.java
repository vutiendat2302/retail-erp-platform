package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.SupplierRequestDto;
import com.optima.inventory.dto.response.SupplierResponseDto;
import com.optima.inventory.entity.SupplierEntity;
import com.optima.inventory.repository.SupplierRepository;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface SupplierMapper {
    @Mapping(target = "id", ignore = true)
    SupplierEntity toSupplier(SupplierResponseDto supplierResponseDto);

    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateSupplier(@MappingTarget SupplierEntity supplierEntity, SupplierResponseDto supplierResponseDto);

    SupplierResponseDto toSupplierResponseDto(SupplierEntity supplierEntity);

    @Mapping(source = "id", target = "id")
    SupplierResponseDto fromProjection(SupplierRepository.SupplierView view);
}
