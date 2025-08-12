package com.optima.inventory.service;

import com.optima.inventory.dto.request.ManufacturingLocationRequestDto;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import com.optima.inventory.mapper.ManufacturingLocationMapper;
import com.optima.inventory.repository.ManufacturingLocationRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManufacturingLocationService {
    @Autowired
    private ManufacturingLocationRepository manufacturingLocationRepository;
    @Autowired
    private ManufacturingLocationMapper manufacturingLocationMapper;

    @Transactional
    public ManufacturingLocationEntity createManufacturingLocation(ManufacturingLocationRequestDto request) {
        ManufacturingLocationEntity manufacturingLocationEntity = manufacturingLocationMapper.toManufacturingLocation(request);

        long newManufacturingLocationId = SnowflakeIdGenerator.nextId();
        while (manufacturingLocationRepository.existsById(newManufacturingLocationId)) {
            newManufacturingLocationId = SnowflakeIdGenerator.nextId();
        }
        manufacturingLocationEntity.setId(newManufacturingLocationId);

        return manufacturingLocationRepository.save(manufacturingLocationEntity);
    }

    public List<ManufacturingLocationEntity> getManufacturingLocations() {
        return manufacturingLocationRepository.findAll();
    }

    public ManufacturingLocationEntity getManufacturingLocation(long manufacturingLocationId) {
        return manufacturingLocationRepository.findById(manufacturingLocationId)
                .orElseThrow(() -> new RuntimeException("Manufacturing Location not found"));
    }

    @Transactional
    public ManufacturingLocationEntity updateManufacturingLocation(long manufacturingLocationId, ManufacturingLocationRequestDto request) {
        ManufacturingLocationEntity manufacturingLocationEntity = manufacturingLocationRepository.findById(manufacturingLocationId)
                .orElseThrow(() -> new RuntimeException("Manufacturing Location not found"));
        manufacturingLocationMapper.updateManufacturingLocation(manufacturingLocationEntity, request);

        return manufacturingLocationRepository.save(manufacturingLocationEntity);
    }

    @Transactional
    public void deletedManufacturingLocation(long manufacturingLocationId) {
        manufacturingLocationRepository.deleteById(manufacturingLocationId);
    }
}
