package com.optima.inventory.service;

import com.optima.inventory.dto.request.StoreProductRequestDto;
import com.optima.inventory.entity.StoreProductEntity;
import com.optima.inventory.mapper.StoreProductMapper;
import com.optima.inventory.repository.StoreProductRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreProductService {
    @Autowired
    private StoreProductRepository storeProductRepository;
    @Autowired
    private StoreProductMapper storeProductMapper;

    @Transactional
    public StoreProductEntity createStoreProduct(StoreProductRequestDto request) {
        StoreProductEntity storeProductEntity = storeProductMapper.toStoreProduct(request);

        long newStoreProductId = SnowflakeIdGenerator.nextId();
        while (storeProductRepository.existsById(newStoreProductId)) {
            newStoreProductId = SnowflakeIdGenerator.nextId();
        }
        storeProductEntity.setId(newStoreProductId);

        return storeProductRepository.save(storeProductEntity);
    }

    public List<StoreProductEntity> getStores() {
        return storeProductRepository.findAll();
    }

    public StoreProductEntity getStore(long storeProductId) {
        return storeProductRepository.findById(storeProductId).orElseThrow(() -> new RuntimeException("store product not found"));
    }

    @Transactional
    public StoreProductEntity updateStoreProduct(long storeProductId, StoreProductRequestDto request) {
        StoreProductEntity storeProductEntity = storeProductRepository.findById(storeProductId)
                .orElseThrow(() -> new RuntimeException("Store not found"));
        storeProductMapper.updateStoreProduct(storeProductEntity, request);

        return storeProductRepository.save(storeProductEntity);
    }

    @Transactional
    public void deleteStoreProduct(long storeProductId) {
        storeProductRepository.deleteById(storeProductId);
    }
}
