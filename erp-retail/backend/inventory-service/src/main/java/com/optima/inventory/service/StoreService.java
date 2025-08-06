package com.optima.inventory.service;

import com.optima.inventory.dto.request.StoreRequestDto;
import com.optima.inventory.entity.StoreEntity;
import com.optima.inventory.mapper.StoreMapper;
import com.optima.inventory.repository.StoreRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreService {
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private StoreMapper storeMapper;

    @Transactional
    public StoreEntity createStore(StoreRequestDto request) {
        StoreEntity storeEntity = storeMapper.toStore(request);

        long newStoreId = SnowflakeIdGenerator.nextId();
        while (storeRepository.existsById(newStoreId)) {
            newStoreId = SnowflakeIdGenerator.nextId();
        }
        storeEntity.setId(newStoreId);

        return storeRepository.save(storeEntity);
    }

    public List<StoreEntity> getStores() {
        return storeRepository.findAll();
    }

    public StoreEntity getStore(long storeId) {
        return storeRepository.findById(storeId).orElseThrow(() -> new RuntimeException("store not found"));
    }

    @Transactional
    public StoreEntity updateStore(long storeId, StoreRequestDto request) {
        StoreEntity storeEntity = storeRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found"));
        storeMapper.updateStore(storeEntity, request);

        return storeRepository.save(storeEntity);
    }

    @Transactional
    public void deleteStore(long storeId) {
        storeRepository.deleteById(storeId);
    }
}
