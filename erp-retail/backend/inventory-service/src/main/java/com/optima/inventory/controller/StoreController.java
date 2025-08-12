package com.optima.inventory.controller;

import com.optima.inventory.dto.request.StoreRequestDto;
import com.optima.inventory.dto.response.StoreResponseDto;
import com.optima.inventory.entity.StoreEntity;
import com.optima.inventory.repository.StoreRepository;
import com.optima.inventory.service.StoreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/store")
public class StoreController {
    @Autowired
    private StoreService storeService;
    @Autowired
    private StoreRepository storeRepository;

    @PostMapping
    public StoreResponseDto createStore(@RequestBody @Valid StoreResponseDto storeResponseDto) {
        return storeService.createStore(storeResponseDto);
    }

    @GetMapping
    public List<StoreResponseDto> getStores() {
        return storeService.getStores();
    }

}
