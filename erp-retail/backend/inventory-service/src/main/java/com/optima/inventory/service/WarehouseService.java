package com.optima.inventory.service;

import com.optima.inventory.dto.request.WarehouseRequestDto;
import com.optima.inventory.entity.WarehouseEntity;
import com.optima.inventory.mapper.WarehouseMapper;
import com.optima.inventory.repository.WarehouseRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {
    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private WarehouseMapper warehouseMapper;

    @Transactional
    public WarehouseEntity createWarehouse(WarehouseRequestDto request) {
        WarehouseEntity warehouseEntity = warehouseMapper.toWarehouse(request);

        long newWarehouseId = SnowflakeIdGenerator.nextId();
        while (warehouseRepository.existsById(newWarehouseId)) {
            newWarehouseId = SnowflakeIdGenerator.nextId();
        }
        warehouseEntity.setId(newWarehouseId);

        return warehouseRepository.save(warehouseEntity);
    }

    public List<WarehouseEntity> getWarehouses() {
        return warehouseRepository.findAll();
    }


    public WarehouseEntity getWarehouse(long warehouseId) {
        return warehouseRepository.findById(warehouseId).orElseThrow(() -> new RuntimeException("Warehouse not found"));
    }

    @Transactional
    public WarehouseEntity updateWarehouse(long warehouseId, WarehouseRequestDto request) {
        WarehouseEntity warehouseEntity = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));
        warehouseMapper.updateWarehouse(warehouseEntity, request);

        return warehouseRepository.save(warehouseEntity);
    }

    @Transactional
    public void deleteWarehouse(long warehouseId) {
        warehouseRepository.deleteById(warehouseId);
    }
}
