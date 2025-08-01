package com.optima.inventory.service;

import com.optima.inventory.dto.request.StoreCreationRequest;
import com.optima.inventory.dto.request.StoreUpdateRequest;
import com.optima.inventory.dto.response.StoreResponse;
import com.optima.inventory.entity.StoreEntity;
import com.optima.inventory.mapper.StoreMapper;
import com.optima.inventory.reponsitory.StoreRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreService {
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private StoreMapper storeMapper;

    public StoreEntity createStore(StoreCreationRequest request) {
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

    public StoreResponse getStore(long storeId) {
        return storeMapper.toStoreResponse(storeRepository.findById(storeId).orElseThrow(() -> new RuntimeException("store not found")));
    }

    public StoreResponse updateStore(long storeId, StoreUpdateRequest request) {
        StoreEntity storeEntity = storeRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found"));
        storeMapper.updateStore(storeEntity, request);

        return storeMapper.toStoreResponse(storeRepository.save(storeEntity));
    }

    public void deleteStore(long storeId) {
        storeRepository.deleteById(storeId);
    }
}
