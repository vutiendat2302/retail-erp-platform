package com.optima.backend.POS_Service.promotion.web.Controller;

import com.optima.backend.POS_Service.common.dto.ApiResponse;
import com.optima.backend.POS_Service.promotion.application.dto.request.PromotionRequest;
import com.optima.backend.POS_Service.promotion.application.dto.response.PromotionResponse;
import com.optima.backend.POS_Service.promotion.application.service.PromotionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE
, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/api/promotion")
@CrossOrigin(origins = "http://localhost:5173")
public class PromotionController {
    PromotionService promotionService;
    @PostMapping
    public ApiResponse<PromotionResponse> createPromotion(@RequestBody PromotionRequest promotionRequest) {
        ApiResponse<PromotionResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(promotionService.createPromotion(promotionRequest));
        return apiResponse;
    }
    @PutMapping("/{promotionId}")
    public ApiResponse<PromotionResponse> updatePromotion(@PathVariable("promotionId") Long promotionId,@RequestBody PromotionRequest promotionRequest) {
        ApiResponse<PromotionResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(promotionService.updatePromotion(promotionId, promotionRequest));
        return apiResponse;
    }
    @DeleteMapping("/{promotionId}")
    public ApiResponse<Void> deletePromotion(@PathVariable("promotionId") Long promotionId) {
        promotionService.deletePromotion(promotionId);
        return new ApiResponse<>( "Mã khuyến mãi đã bị xóa");
    }
    @GetMapping("/{promotionId}")
    public ApiResponse<PromotionResponse> getPromotion(@PathVariable("promotionId") Long promotionId) {
        ApiResponse<PromotionResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(promotionService.getPromotionById(promotionId));
       return apiResponse;
    }
    @GetMapping
    public ApiResponse<List<PromotionResponse>> getPromotions() {
        ApiResponse<List<PromotionResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setData(promotionService.getPromotions());
        return apiResponse;
    }
}
