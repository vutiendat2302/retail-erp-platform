package com.optima.inventory.controller;

import com.optima.inventory.dto.request.ManufacturingLocationRequestDto;
import com.optima.inventory.dto.response.ManufacturingLocationNameResponse;
import com.optima.inventory.dto.response.ManufacturingLocationResponseDto;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import com.optima.inventory.repository.ManufacturingLocationRepository;
import com.optima.inventory.service.ManufacturingLocationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/manufacturingLocation")
public class ManufacturingLocationController {
    @Autowired
    private ManufacturingLocationService manufacturingLocationService;
    @Autowired
    private ManufacturingLocationRepository manufacturingLocationRepository;

    @GetMapping("/name")
    public List<ManufacturingLocationNameResponse> getManufacturingName() {
        return manufacturingLocationService.getManufacturingName();
    }
}
