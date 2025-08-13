package com.optima.inventory.controller;

import com.optima.inventory.dto.request.ManufacturingLocationRequestDto;
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

    @PostMapping
    public ManufacturingLocationEntity createManufacturingLocation(@RequestBody @Valid ManufacturingLocationRequestDto request) {
        return manufacturingLocationService.createManufacturingLocation(request);
    }

    @GetMapping
    public List<ManufacturingLocationEntity> getManufacturingLocations() {
        return manufacturingLocationService.getManufacturingLocations();
    }

    @GetMapping("/{manufacturingLocationId}")
    public ManufacturingLocationEntity getManufacturingLocation(@PathVariable("manufacturingLocationId") long manufacturingLocationId) {
        return manufacturingLocationService.getManufacturingLocation(manufacturingLocationId);
    }

    @PutMapping("/{manufacturingLocationId}")
    public ManufacturingLocationEntity updateManufacturingLocation(@PathVariable("manufacturingLocationId") long manufacturingLocationId,
                                                                     @RequestBody ManufacturingLocationRequestDto request) {
        return manufacturingLocationService.updateManufacturingLocation(manufacturingLocationId, request);
    }

    @DeleteMapping("/manufacturingLocationId")
    public String deleteManufacturingLocation(@PathVariable("manufacturingLocationId") long manufacturingLocationId) {
        manufacturingLocationService.deletedManufacturingLocation(manufacturingLocationId);
        return "Manufacturing Location has been deleted";
    }
}
