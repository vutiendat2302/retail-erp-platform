package com.optima.inventory.service;

import com.optima.inventory.dto.response.WarehouseResponseDto;
import com.optima.inventory.entity.WarehouseEntity;
import com.optima.inventory.mapper.WarehouseMapper;
import com.optima.inventory.repository.WarehouseRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WarehouseService {
    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private WarehouseMapper warehouseMapper;

    @Transactional
    public WarehouseResponseDto createWarehouse(WarehouseResponseDto warehouseResponseDto) {
        WarehouseEntity warehouseEntity = warehouseMapper.toWarehouse(warehouseResponseDto);

        long newWarehouseId = SnowflakeIdGenerator.nextId();
        while (warehouseRepository.existsById(newWarehouseId)) {
            newWarehouseId = SnowflakeIdGenerator.nextId();
        }
        warehouseEntity.setId(newWarehouseId);
        warehouseEntity.setStatus(warehouseResponseDto.getStatusString().equalsIgnoreCase("active"));

        return warehouseMapper.toWarehouseResponseDto(warehouseRepository.save(warehouseEntity));
    }

    public List<WarehouseResponseDto> getWarehouses() {
        return warehouseRepository.findAll().stream()
                .map(warehouseMapper::toWarehouseResponseDto)
                .collect(Collectors.toList());
    }


    public WarehouseEntity getWarehouse(long warehouseId) {
        return warehouseRepository.findById(warehouseId).orElseThrow(() -> new RuntimeException("Warehouse not found"));
    }

    @Transactional
    public WarehouseEntity updateWarehouse(long warehouseId, WarehouseResponseDto request) {
        WarehouseEntity warehouseEntity = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));
        warehouseMapper.updateWarehouseResponseDto(warehouseEntity, request);

        return warehouseRepository.save(warehouseEntity);
    }

    @Transactional
    public void deleteWarehouse(long warehouseId) {
        warehouseRepository.deleteById(warehouseId);
    }
}
