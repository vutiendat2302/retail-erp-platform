package com.optima.inventory.service;

import com.optima.inventory.dto.request.CategoryCreationRequest;
import com.optima.inventory.dto.request.CategoryUpdateRequest;
import com.optima.inventory.dto.response.CategoryResponse;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.mapper.CategoryMapper;
import com.optima.inventory.reponsitory.CategoryRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CategoryMapper categoryMapper;

    public CategoryEntity createCategory(CategoryCreationRequest request) {
        CategoryEntity categoryEntity = categoryMapper.toCategory(request);

        long newCategoryId = SnowflakeIdGenerator.nextId();
        while (categoryRepository.existsById(newCategoryId)) {
            newCategoryId = SnowflakeIdGenerator.nextId();
        }
        categoryEntity.setId(newCategoryId);

        return categoryRepository.save(categoryEntity);
    }

    public List<CategoryEntity> getCategories() {
        return categoryRepository.findAll();
    }

    public CategoryResponse getCategory(long categoryId) {
        return categoryMapper.toCategoryResponse(categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("category not found")));
    }

    public CategoryResponse updateCategory(long categoryId, CategoryUpdateRequest request) {
        CategoryEntity categoryEntity = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        categoryMapper.updateCategory(categoryEntity, request);

        return categoryMapper.toCategoryResponse(categoryRepository.save(categoryEntity));
    }

    public void deleteCategory(long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
