package com.optima.inventory.controller;

import com.optima.inventory.dto.request.StoreRequestDto;
import com.optima.inventory.entity.StoreEntity;
import com.optima.inventory.repository.StoreRepository;
import com.optima.inventory.service.StoreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/store")
public class StoreController {
    @Autowired
    private StoreService storeService;
    @Autowired
    private StoreRepository storeRepository;

    @PostMapping
    public StoreEntity createStore(@RequestBody @Valid StoreRequestDto request) {
        return storeService.createStore(request);
    }

    @GetMapping
    public List<StoreEntity> getStores() {
        return storeService.getStores();
    }

    @GetMapping("/{storeId}")
    public StoreEntity getStore(@PathVariable("storeId") long storeId) {
        return storeService.getStore(storeId);
    }

    @PutMapping("/{storeId}")
    public StoreEntity updateStore(@PathVariable("storeId") long storeId, @RequestBody StoreRequestDto request) {
        return storeService.updateStore(storeId, request);
    }

    @DeleteMapping("/{storeId}")
    public String deleteStore(@PathVariable("storeId") long storeId) {
        storeService.deleteStore(storeId);
        return "Store has been deleted";
    }
}
