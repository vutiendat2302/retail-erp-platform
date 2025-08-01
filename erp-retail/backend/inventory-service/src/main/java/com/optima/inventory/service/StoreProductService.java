package com.optima.inventory.service;

import com.optima.inventory.dto.request.StoreProductCreationRequest;
import com.optima.inventory.dto.request.StoreProductUpdateRequest;
import com.optima.inventory.dto.response.StoreProductResponse;
import com.optima.inventory.entity.StoreProductEntity;
import com.optima.inventory.mapper.StoreProductMapper;
import com.optima.inventory.reponsitory.StoreProductRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreProductService {
    @Autowired
    private StoreProductRepository storeProductRepository;
    @Autowired
    private StoreProductMapper storeProductMapper;

    public StoreProductEntity createStoreProduct(StoreProductCreationRequest request) {
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

    public StoreProductResponse getStore(long storeProductId) {
        return storeProductMapper.toStoreProductResponse(storeProductRepository.findById(storeProductId).orElseThrow(() -> new RuntimeException("store product not found")));
    }

    public StoreProductResponse updateStoreProduct(long storeProductId, StoreProductUpdateRequest request) {
        StoreProductEntity storeProductEntity = storeProductRepository.findById(storeProductId)
                .orElseThrow(() -> new RuntimeException("Store not found"));
        storeProductMapper.updateStoreProduct(storeProductEntity, request);

        return storeProductMapper.toStoreProductResponse(storeProductRepository.save(storeProductEntity));
    }

    public void deleteStoreProduct(long storeProductId) {
        storeProductRepository.deleteById(storeProductId);
    }
}
