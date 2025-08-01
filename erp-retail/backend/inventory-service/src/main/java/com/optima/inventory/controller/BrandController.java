package com.optima.inventory.controller;

import com.optima.inventory.dto.request.BrandCreationRequest;
import com.optima.inventory.dto.request.BrandUpdateRequest;
import com.optima.inventory.dto.response.BrandResponse;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.reponsitory.BrandRepository;
import com.optima.inventory.service.BrandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brand")
public class BrandController {
    @Autowired
    private BrandService brandService;
    @Autowired
    private BrandRepository brandRepository;

    @PostMapping
    public BrandEntity createBrand(@RequestBody @Valid  BrandCreationRequest request) {
        return brandService.createBrand(request);
    }

    @GetMapping
    public List<BrandEntity> getBrands() {
        return brandService.getBrands();
    }

    @GetMapping("/{brandId}")
    public BrandResponse getBrand(@PathVariable("brandId") long brandId) {
        return brandService.getBrand(brandId);
    }

    @PutMapping("/{brandId}")
    public BrandResponse updateBrand(@PathVariable("brandId") long brandId, @RequestBody BrandUpdateRequest request) {
        return brandService.updateBrand(brandId, request);
    }

    @DeleteMapping("/{brandId}")
    public String deleteBrand(@PathVariable("brandId") long brandId) {
        brandService.deleteBrand(brandId);
        return "Brand has been deleted";
    }
}
