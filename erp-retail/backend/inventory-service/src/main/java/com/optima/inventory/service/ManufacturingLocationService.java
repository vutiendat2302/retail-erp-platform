package com.optima.inventory.service;

import com.optima.inventory.dto.request.ManufacturingLocationRequestDto;
import com.optima.inventory.dto.response.ManufacturingLocationNameResponse;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import com.optima.inventory.mapper.ManufacturingLocationMapper;
import com.optima.inventory.repository.ManufacturingLocationRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ManufacturingLocationService {
    @Autowired
    private ManufacturingLocationRepository manufacturingLocationRepository;
    @Autowired
    private ManufacturingLocationMapper manufacturingLocationMapper;

    public List<ManufacturingLocationNameResponse> getManufacturingName() {
        return manufacturingLocationRepository.getManufacturingLocationName().stream()
                .map(manufacturingLocationMapper::toManufacturingName)
                .collect(Collectors.toList());
    }
}
