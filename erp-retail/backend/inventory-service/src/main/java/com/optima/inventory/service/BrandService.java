package com.optima.inventory.service;

import com.optima.inventory.dto.request.BrandRequesDto;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.mapper.BrandMapper;
import com.optima.inventory.repository.BrandRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Builder
@Data
public class BrandService {
    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private BrandMapper brandMapper;

    public BrandService(BrandRepository brandRepository, BrandMapper brandMapper) {
        this.brandRepository = brandRepository;
        this.brandMapper = brandMapper;
    }

    @Transactional
    public BrandEntity createBrand(BrandRequesDto request) {
        if (brandRepository.existsByName(request.getName())) {
            throw new RuntimeException("Name existed");
        }

        BrandEntity brandEntity = brandMapper.toBrand(request);

        long newBrandId= SnowflakeIdGenerator.nextId();
        while (brandRepository.existsById(newBrandId)) {
            newBrandId = SnowflakeIdGenerator.nextId();
        }

        brandEntity.setId(newBrandId);

        return brandRepository.save(brandEntity);
    }

    public List<BrandEntity> getBrands() {
        return brandRepository.findAll();
    }

    public BrandEntity getBrand(long brandId) {
        return brandRepository.findById(brandId).orElseThrow(() -> new RuntimeException("Brand not exist"));
    }

    @Transactional
    public BrandEntity updateBrand(long brandId, BrandRequesDto request) {
        BrandEntity brandEntity = brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        brandMapper.updateBrand(brandEntity, request);

        return brandRepository.save(brandEntity);
    }

    @Transactional
    public void deleteBrand(long brandId) {
        brandRepository.deleteById(brandId);
    }
}
