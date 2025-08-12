package com.optima.inventory.mapper;

import com.optima.inventory.dto.response.ProductResponseDto;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import com.optima.inventory.entity.ProductEntity;
import com.optima.inventory.repository.ProductRepository;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface ProductMapper {


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "brandId", ignore = true)
    @Mapping(target = "categoryId", ignore = true)
    @Mapping(target = "manufacturingLocationId", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ProductEntity toProduct(ProductResponseDto productResponseDto);

    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProduct(@MappingTarget ProductEntity productEntity, ProductResponseDto productResponseDto);

    ProductResponseDto toProductResponseDto(ProductEntity productEntity);


    @Mapping(source = "id", target = "id")
    ProductResponseDto fromProjection(ProductRepository.ProductView view);

}
