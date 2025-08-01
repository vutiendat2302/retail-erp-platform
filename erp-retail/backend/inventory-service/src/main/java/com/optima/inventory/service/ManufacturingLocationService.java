package com.optima.inventory.service;

import com.optima.inventory.dto.request.ManufacturingLocationCreationRequest;
import com.optima.inventory.dto.request.ManufacturingLocationUpdateRequest;
import com.optima.inventory.dto.response.ManufacturingLocationResponse;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import com.optima.inventory.mapper.ManufacturingLocationMapper;
import com.optima.inventory.reponsitory.ManufacturingLocationRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManufacturingLocationService {
    @Autowired
    private ManufacturingLocationRepository manufacturingLocationRepository;
    @Autowired
    private ManufacturingLocationMapper manufacturingLocationMapper;

    public ManufacturingLocationEntity createManufacturingLocation(ManufacturingLocationCreationRequest request) {
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

    public ManufacturingLocationResponse getManufacturingLocation(long manufacturingLocationId) {
        return manufacturingLocationMapper.toManufacturingLocationResponse(manufacturingLocationRepository.findById(manufacturingLocationId)
                .orElseThrow(() -> new RuntimeException("Manufacturing Location not found")));
    }

    public ManufacturingLocationResponse updateManufacturingLocation(long manufacturingLocationId, ManufacturingLocationUpdateRequest request) {
        ManufacturingLocationEntity manufacturingLocationEntity = manufacturingLocationRepository.findById(manufacturingLocationId)
                .orElseThrow(() -> new RuntimeException("Manufacturing Location not found"));
        manufacturingLocationMapper.updateManufacturingLocation(manufacturingLocationEntity, request);

        return manufacturingLocationMapper.toManufacturingLocationResponse(manufacturingLocationRepository.save(manufacturingLocationEntity));
    }

    public void deletedManufacturingLocation(long manufacturingLocationId) {
        manufacturingLocationRepository.deleteById(manufacturingLocationId);
    }
}
