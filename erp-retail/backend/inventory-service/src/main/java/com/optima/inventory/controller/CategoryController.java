package com.optima.inventory.controller;

import com.optima.inventory.dto.request.CategoryCreationRequest;
import com.optima.inventory.dto.request.CategoryUpdateRequest;
import com.optima.inventory.dto.response.CategoryResponse;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.reponsitory.CategoryRepository;
import com.optima.inventory.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public CategoryEntity createCategory(@RequestBody @Valid CategoryCreationRequest request) {
        return categoryService.createCategory(request);
    }

    @GetMapping
    public List<CategoryEntity> getCategories() {
        return categoryService.getCategories();
    }

    @GetMapping("/{categoryId}")
    public CategoryResponse getCategory(@PathVariable("categoryId") long categoryId) {
        return categoryService.getCategory(categoryId);
    }

    @PutMapping("/{categoryId}")
    public CategoryResponse updateCategory(@PathVariable("categoryId") long categoryId, @RequestBody CategoryUpdateRequest request) {
        return categoryService.updateCategory(categoryId, request);
    }

    @DeleteMapping("/{categoryId}")
    public String deleteCategory(@PathVariable("categoryId") long categoryId) {
        categoryService.deleteCategory(categoryId);
        return "Category has been deleted";
    }
}
