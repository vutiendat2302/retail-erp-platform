package com.optima.inventory.service;

import com.optima.inventory.dto.request.WarehouseCreationRequest;
import com.optima.inventory.dto.request.WarehouseUpdateRequest;
import com.optima.inventory.dto.response.WarehouseResponse;
import com.optima.inventory.entity.WarehouseEntity;
import com.optima.inventory.mapper.WarehouseMapper;
import com.optima.inventory.reponsitory.WarehouseRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {
    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private WarehouseMapper warehouseMapper;

    public WarehouseEntity createWarehouse(WarehouseCreationRequest request) {
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

    public WarehouseResponse getWarehouse(long warehouseId) {
        return warehouseMapper.toWarehouseResponse(warehouseRepository.findById(warehouseId).orElseThrow(() -> new RuntimeException("Warehouse not found")));
    }

    public WarehouseResponse updateWarehouse(long warehouseId, WarehouseUpdateRequest request) {
        WarehouseEntity warehouseEntity = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));
        warehouseMapper.updateWarehouse(warehouseEntity, request);

        return warehouseMapper.toWarehouseResponse(warehouseRepository.save(warehouseEntity));
    }

    public void deleteWarehouse(long warehouseId) {
        warehouseRepository.deleteById(warehouseId);
    }
}
