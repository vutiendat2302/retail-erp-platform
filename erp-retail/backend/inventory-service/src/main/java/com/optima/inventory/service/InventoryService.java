package com.optima.inventory.service;

import com.optima.inventory.dto.request.InventoryRequestDto;
import com.optima.inventory.entity.InventoryEntity;
import com.optima.inventory.mapper.InventoryMapper;
import com.optima.inventory.repository.InventoryRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private InventoryMapper inventoryMapper;

    @Transactional
    public InventoryEntity createInventory(InventoryRequestDto request) {
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


    public InventoryEntity getInventory(long inventoryId) {
        return inventoryRepository.findById(inventoryId).orElseThrow(() -> new RuntimeException("Inventory not found"));
    }

    @Transactional
    public InventoryEntity updateInventory(long inventoryId, InventoryRequestDto request) {
        InventoryEntity inventoryEntity = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));
        inventoryMapper.updateInventory(inventoryEntity, request);

        return inventoryRepository.save(inventoryEntity);
    }

    @Transactional
    public void deleteInventory(long inventoryId) {
        inventoryRepository.deleteById(inventoryId);
    }
}
