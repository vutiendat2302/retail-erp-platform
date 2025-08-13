package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.ProductRequestDto;
import com.optima.inventory.dto.response.ProductResponseDto;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import com.optima.inventory.entity.ProductEntity;
import org.mapstruct.*;


@Mapper(componentModel = "spring", uses = {BrandMapper.class, CategoryMapper.class, ManufacturingLocationMapper.class})
public interface ProductMapper {
    @Mapping(source = "request.name", target = "name")
    @Mapping(source = "request.seoTitle", target = "seoTitle")
    @Mapping(source = "request.description", target = "description")
    @Mapping(source = "request.status", target = "status")
    @Mapping(source = "request.metaKeyword", target = "metaKeyword")
    @Mapping(source = "request.createBy", target = "createBy")
    @Mapping(source = "request.createAt", target = "createAt")
    @Mapping(source = "request.updateBy", target = "updateBy")
    @Mapping(source = "request.updateAt", target = "updateAt")
    @Mapping(target = "id", ignore = true)

    @Mapping(target = "brand", source = "brandEntity")
    @Mapping(target = "category", source = "categoryEntity")
    @Mapping(target = "manufacturingLocation", source = "manufacturingLocationEntity")
    ProductEntity toProduct(ProductRequestDto request, BrandEntity brandEntity, CategoryEntity categoryEntity, ManufacturingLocationEntity manufacturingLocationEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createBy", ignore = true)
    @Mapping(target = "createAt", ignore = true)

    @Mapping(source = "request.name", target = "name")
    @Mapping(source = "request.seoTitle", target = "seoTitle")
    @Mapping(source = "request.description", target = "description")
    @Mapping(source = "request.status", target = "status")
    @Mapping(source = "request.metaKeyword", target = "metaKeyword")
    @Mapping(source = "request.updateBy", target = "updateBy")
    @Mapping(source = "request.updateAt", target = "updateAt")

    @Mapping(target = "brand", source = "brandEntity")
    @Mapping(target = "category", source = "categoryEntity")
    @Mapping(target = "manufacturingLocation", source = "manufacturingLocationEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProduct(@MappingTarget ProductEntity productEntity, ProductRequestDto request, BrandEntity brandEntity,
                       CategoryEntity categoryEntity, ManufacturingLocationEntity manufacturingLocationEntity);

    @Mapping(source = "brand", target = "brandResponseDto")
    @Mapping(source = "category", target = "categoryResponseDto")
    @Mapping(source = "manufacturingLocation", target = "manufacturingLocationResponseDto")

    ProductResponseDto toProductResponseDto(ProductEntity productEntity);

}
