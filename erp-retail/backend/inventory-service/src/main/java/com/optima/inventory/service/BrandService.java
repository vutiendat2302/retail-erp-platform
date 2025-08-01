package com.optima.inventory.service;

import com.optima.inventory.dto.request.BrandCreationRequest;
import com.optima.inventory.dto.request.BrandUpdateRequest;
import com.optima.inventory.dto.response.BrandResponse;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.mapper.BrandMapper;
import com.optima.inventory.reponsitory.BrandRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
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

    public BrandEntity createBrand(BrandCreationRequest request) {
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

    public BrandResponse getBrand(long brandId) {
        return brandMapper.toBrandResponse(brandRepository.findById(brandId).orElseThrow(() -> new RuntimeException("Brand not exist")));
    }

    public BrandResponse updateBrand(long brandId, BrandUpdateRequest request) {
        BrandEntity brandEntity = brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        brandMapper.updateBrand(brandEntity, request);

        return brandMapper.toBrandResponse(brandRepository.save(brandEntity));
    }

    public void deleteBrand(long brandId) {
        brandRepository.deleteById(brandId);
    }
}
