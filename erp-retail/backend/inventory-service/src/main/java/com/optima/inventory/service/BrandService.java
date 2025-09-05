package com.optima.inventory.service;

import com.optima.inventory.dto.request.BrandRequesDto;
import com.optima.inventory.dto.response.BrandNameResponse;
import com.optima.inventory.dto.response.BrandResponseDto;
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
}
