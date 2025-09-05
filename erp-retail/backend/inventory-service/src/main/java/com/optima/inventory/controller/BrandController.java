package com.optima.inventory.controller;

import com.optima.inventory.dto.request.BrandRequesDto;
import com.optima.inventory.dto.response.BrandNameResponse;
import com.optima.inventory.dto.response.BrandResponseDto;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.repository.BrandRepository;
import com.optima.inventory.service.BrandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/brand")
public class BrandController {
    @Autowired
    private BrandService brandService;
    @Autowired
    private BrandRepository brandRepository;

    @GetMapping("/name")
    public List<BrandNameResponse> getBrandName() {
        return brandService.getBrandName();
    }

    @GetMapping("/getCountBrandActive")
    public int getCountBrandActive() {
        return brandService.getCountBrandActive();
    }
}
