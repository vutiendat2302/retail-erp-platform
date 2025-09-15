package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.ProductBatchRequestDto;
import com.optima.inventory.dto.response.BrandResponseDto;
import com.optima.inventory.dto.response.ProductBatchNameResponse;
import com.optima.inventory.dto.response.ProductBatchResponseDto;
import com.optima.inventory.entity.ProductBatchEntity;
import com.optima.inventory.repository.ProductBatchRepository;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProductBatchMapper {
    @Mapping(target = "id", ignore = true)
    ProductBatchEntity toProductBatch(ProductBatchRequestDto request);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProductBatch(@MappingTarget ProductBatchEntity productBatchEntity, ProductBatchRequestDto request);

    ProductBatchNameResponse toProductBatchName(ProductBatchRepository.ProductBatchView view);

}
