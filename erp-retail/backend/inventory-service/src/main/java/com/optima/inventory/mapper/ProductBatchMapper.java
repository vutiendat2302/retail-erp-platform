package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.ProductBatchRequestDto;
import com.optima.inventory.entity.ProductBatchEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProductBatchMapper {
    ProductBatchEntity toProductBatch(ProductBatchRequestDto request);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProductBatch(@MappingTarget ProductBatchEntity productBatchEntity, ProductBatchRequestDto request);

}
