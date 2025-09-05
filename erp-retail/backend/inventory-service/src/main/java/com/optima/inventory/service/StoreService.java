package com.optima.inventory.service;

import com.optima.inventory.dto.request.StoreRequestDto;
import com.optima.inventory.dto.response.StoreResponseDto;
import com.optima.inventory.entity.StoreEntity;
import com.optima.inventory.mapper.StoreMapper;
import com.optima.inventory.repository.StoreRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoreService {
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private StoreMapper storeMapper;

    @Transactional
    public StoreResponseDto createStore(StoreResponseDto storeResponseDto) {
        StoreEntity storeEntity = storeMapper.toStore(storeResponseDto);

        long newStoreId = SnowflakeIdGenerator.nextId();
        while (storeRepository.existsById(newStoreId)) {
            newStoreId = SnowflakeIdGenerator.nextId();
        }
        storeEntity.setId(newStoreId);
        storeEntity.setStatus(storeResponseDto.getStatusString().equalsIgnoreCase("active"));

        return storeMapper.toStoreResponseDto(storeRepository.save(storeEntity));
    }

    public List<StoreResponseDto> getStores() {
        return storeRepository.findAll().stream()
                .map(storeMapper::toStoreResponseDto)
                .collect(Collectors.toList());
    }

}
