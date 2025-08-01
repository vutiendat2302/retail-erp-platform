package com.optima.inventory.controller;

import com.optima.inventory.dto.request.StoreCreationRequest;
import com.optima.inventory.dto.request.StoreUpdateRequest;
import com.optima.inventory.dto.response.StoreResponse;
import com.optima.inventory.entity.StoreEntity;
import com.optima.inventory.reponsitory.StoreRepository;
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
    public StoreEntity createStore(@RequestBody @Valid StoreCreationRequest request) {
        return storeService.createStore(request);
    }

    @GetMapping
    public List<StoreEntity> getStores() {
        return storeService.getStores();
    }

    @GetMapping("/{storeId}")
    public StoreResponse getStore(@PathVariable("storeId") long storeId) {
        return storeService.getStore(storeId);
    }

    @PutMapping("/{storeId}")
    public StoreResponse updateStore(@PathVariable("storeId") long storeId, @RequestBody StoreUpdateRequest request) {
        return storeService.updateStore(storeId, request);
    }

    @DeleteMapping("/{storeId}")
    public String deleteStore(@PathVariable("storeId") long storeId) {
        storeService.deleteStore(storeId);
        return "Store has been deleted";
    }
}
