package com.optima.inventory.service;

import com.optima.inventory.dto.request.InventoryRequestDto;
import com.optima.inventory.dto.response.InventoryResponseDto;
import com.optima.inventory.entity.InventoryEntity;
import com.optima.inventory.mapper.InventoryMapper;
import com.optima.inventory.repository.InventoryRepository;
import com.optima.inventory.repository.ProductRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private InventoryMapper inventoryMapper;
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public InventoryResponseDto createInventory(InventoryResponseDto inventoryResponseDto) {
        InventoryEntity inventoryEntity = inventoryMapper.toInventory(inventoryResponseDto);

        long newProductId = SnowflakeIdGenerator.nextId();
        while (inventoryRepository.existsById(newProductId)) {
            newProductId = SnowflakeIdGenerator.nextId();
        }
        inventoryEntity.setId(newProductId);

        return inventoryMapper.toInventoryResponseDto(inventoryRepository.save(inventoryEntity));
    }

    public List<InventoryResponseDto> getInventories() {
        return inventoryRepository.findAll().stream()
                .map(inventoryMapper::toInventoryResponseDto)
                .collect(Collectors.toList());
    }

    public List<InventoryResponseDto> findInventoryByWarehouse(Long warehouseId) {
        return inventoryRepository.findInventoryByWarehouse(warehouseId).stream()
                .map(inventoryMapper::fromInventory)
                .collect(Collectors.toList());
    }

    public Page<InventoryResponseDto> getAllPage(Pageable pageable) {
        return inventoryRepository.findAllInf(pageable).map(inventoryMapper::fromInventory);
    }

    public BigInteger getTotalPriceNormal(Long warehouseId) {
        return inventoryRepository.getTotalPriceNormal(warehouseId);
    }

    public BigInteger getCountProductInWarehouse(Long warehouseId) {
        return inventoryRepository.getCountProductInWarehouse(warehouseId);
    }

    public BigInteger getSumProductInWarehouse(Long warehouseId) {
        return inventoryRepository.getSumQuantityProductInWarehouse(warehouseId);
    }

    public int getCountProductsNearExpiry(Long warehouseId) {
        LocalDateTime afterTimeNow = LocalDateTime.now().plusDays(30);
        return inventoryRepository.getCountProductsNearExpiry(warehouseId, afterTimeNow);
    }

    public int getCountProductsNearOut(Long warehouseId) {
        return inventoryRepository.getCountProductsNearOut(warehouseId);
    }

    @Transactional
    public Page<InventoryResponseDto> getSearchAllIn4(Long warehouseId, String productName, Long productBatch, Pageable pageable) {
        return inventoryRepository.getSearchAllIn4(warehouseId, productName, productBatch, pageable).map(inventoryMapper::fromInventory);
    }
}
