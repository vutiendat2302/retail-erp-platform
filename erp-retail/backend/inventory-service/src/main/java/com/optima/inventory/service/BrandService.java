package com.optima.inventory.service;

import com.optima.inventory.dto.request.BrandRequesDto;
import com.optima.inventory.dto.response.BrandNameResponse;
import com.optima.inventory.dto.response.BrandResponseDto;
import com.optima.inventory.dto.response.CategoryNameResponse;
import com.optima.inventory.dto.response.CategoryResponseDto;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.mapper.BrandMapper;
import com.optima.inventory.repository.BrandRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Builder
@Data
public class BrandService {
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private BrandMapper brandMapper;

    public List<BrandNameResponse> getBrandName() {
        return brandRepository.getBrandName().stream()
                .map(brandMapper::toBrandName)
                .collect(Collectors.toList());
    }

    public int getCountBrandActive() {
        return brandRepository.getCountBrandActive();
    }

    @Transactional
    public BrandResponseDto createBrand(BrandResponseDto response) {
        BrandEntity brandEntity = brandMapper.toBrand(response);

        long newCategoryId = SnowflakeIdGenerator.nextId();
        while (brandRepository.existsById(newCategoryId)) {
            newCategoryId = SnowflakeIdGenerator.nextId();
        }
        brandEntity.setId(newCategoryId);

        return brandMapper.toBrandResponseDto(brandRepository.save(brandEntity));
    }

    public BrandResponseDto getBrand(Long brandId) {
        BrandEntity brandEntity = brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("brand not find" + brandId));
        return brandMapper.toBrandResponseDto(brandEntity);
    }

    @Transactional
    public BrandResponseDto updateBrand(Long categoryId, BrandResponseDto brandResponseDto) {
        BrandEntity brandEntity = brandMapper.toBrand(brandResponseDto);
        brandMapper.updateBrand(brandEntity, brandResponseDto);
        BrandEntity afterUpdateBrand = brandRepository.save(brandEntity);
        return brandMapper.toBrandResponseDto(afterUpdateBrand);
    }

    @Transactional
    public void deleteBrand(long brandId) {
        brandRepository.deleteById(brandId);
    }


    public Page<BrandResponseDto> getSearchAllIn4(String search, Boolean status, Pageable pageable) {
        return brandRepository.getSearchAllIn4(search, status, pageable).map(brandMapper::fromProjection);
    }
}
