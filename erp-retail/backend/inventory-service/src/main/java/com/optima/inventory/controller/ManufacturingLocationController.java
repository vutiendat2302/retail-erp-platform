package com.optima.inventory.controller;

import com.optima.inventory.dto.request.ManufacturingLocationCreationRequest;
import com.optima.inventory.dto.request.ManufacturingLocationUpdateRequest;
import com.optima.inventory.dto.response.ManufacturingLocationResponse;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import com.optima.inventory.reponsitory.ManufacturingLocationRepository;
import com.optima.inventory.service.ManufacturingLocationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manufacturing_location")
public class ManufacturingLocationController {
    @Autowired
    private ManufacturingLocationService manufacturingLocationService;
    @Autowired
    private ManufacturingLocationRepository manufacturingLocationRepository;

    @PostMapping
    public ManufacturingLocationEntity createManufacturingLocation(@RequestBody @Valid ManufacturingLocationCreationRequest request) {
        return manufacturingLocationService.createManufacturingLocation(request);
    }

    @GetMapping
    public List<ManufacturingLocationEntity> getManufacturingLocations() {
        return manufacturingLocationService.getManufacturingLocations();
    }

    @GetMapping("/{manufacturingLocationId}")
    public ManufacturingLocationResponse getManufacturingLocation(@PathVariable("manufacturingLocationId") long manufacturingLocationId) {
        return manufacturingLocationService.getManufacturingLocation(manufacturingLocationId);
    }

    @PutMapping("/{manufacturingLocationId}")
    public ManufacturingLocationResponse updateManufacturingLocation(@PathVariable("manufacturingLocationId") long manufacturingLocationId,
                                                                     @RequestBody ManufacturingLocationUpdateRequest request) {
        return manufacturingLocationService.updateManufacturingLocation(manufacturingLocationId, request);
    }

    @DeleteMapping("/manufacturingLocationId")
    public String deleteManufacturingLocation(@PathVariable("manufacturingLocationId") long manufacturingLocationId) {
        manufacturingLocationService.deletedManufacturingLocation(manufacturingLocationId);
        return "Manufacturing Location has been deleted";
    }
}
