package com.optima.inventory.service;

import com.optima.inventory.dto.request.InventoryCreationRequest;
import com.optima.inventory.dto.request.InventoryUpdateRequest;
import com.optima.inventory.dto.response.InventoryResponse;
import com.optima.inventory.entity.InventoryEntity;
import com.optima.inventory.mapper.InventoryMapper;
import com.optima.inventory.reponsitory.InventoryRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private InventoryMapper inventoryMapper;

    public InventoryEntity createInventory(InventoryCreationRequest request) {
        InventoryEntity inventoryEntity = inventoryMapper.toInventory(request);

        long newInventoryId = SnowflakeIdGenerator.nextId();
        while (inventoryRepository.existsById(newInventoryId)) {
            newInventoryId = SnowflakeIdGenerator.nextId();
        }
        inventoryEntity.setId(newInventoryId);

        return inventoryRepository.save(inventoryEntity);
    }

    public List<InventoryEntity> getInventories() {
        return inventoryRepository.findAll();
    }

    public InventoryResponse getInventory(long inventoryId) {
        return inventoryMapper.toInventoryResponse(inventoryRepository.findById(inventoryId).orElseThrow(() -> new RuntimeException("Inventory not found")));
    }

    public InventoryResponse updateInventory(long inventoryId, InventoryUpdateRequest request) {
        InventoryEntity inventoryEntity = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));
        inventoryMapper.updateInventory(inventoryEntity, request);

        return inventoryMapper.toInventoryResponse(inventoryRepository.save(inventoryEntity));
    }

    public void deleteInventory(long inventoryId) {
        inventoryRepository.deleteById(inventoryId);
    }
}
