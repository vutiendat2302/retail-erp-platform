package com.optima.inventory.mapper;

import com.optima.inventory.dto.request.BrandRequesDto;
import com.optima.inventory.dto.response.BrandNameResponse;
import com.optima.inventory.dto.response.BrandResponseDto;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.repository.BrandRepository;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

import javax.swing.plaf.IconUIResource;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    @Mapping(target = "id", ignore = true)
    BrandEntity toBrand(BrandResponseDto brandResponseDto);

    BrandResponseDto toBrandResponseDto(BrandEntity brandEntity);

    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateBrand(@MappingTarget BrandEntity brandEntity, BrandResponseDto brandResponseDto);

    BrandNameResponse toBrandName(BrandRepository.BrandNameView view);

    @Mapping(source = "id", target = "id")
    BrandResponseDto fromProjection(BrandRepository.BrandView view);
}

