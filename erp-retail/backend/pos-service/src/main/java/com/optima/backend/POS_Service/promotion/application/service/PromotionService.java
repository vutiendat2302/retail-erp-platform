package com.optima.backend.POS_Service.promotion.application.service;

import com.optima.backend.POS_Service.order.infrastructure.entity.OrderEntity;
import com.optima.backend.POS_Service.order.infrastructure.repository.OrderRepository;
import com.optima.backend.POS_Service.promotion.application.dto.request.PromotionRequest;
import com.optima.backend.POS_Service.promotion.application.dto.response.PromotionResponse;
import com.optima.backend.POS_Service.promotion.application.mapper.PromotionMapper;
import com.optima.backend.POS_Service.promotion.infrastructure.entity.PromotionEntity;
import com.optima.backend.POS_Service.promotion.infrastructure.repository.PromotionRepository;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Getter
@Setter
@RequiredArgsConstructor
public class PromotionService {
    PromotionRepository promotionRepository;
    PromotionMapper promotionMapper;
    OrderRepository orderRepository;
    @Transactional
    public PromotionResponse createPromotion(PromotionRequest promotionRequest) {
        if (promotionRepository.existsByCodePromotion(promotionRequest.getCodePromotion())) {
            throw new RuntimeException("Mã khuyến mãi đã tồn tại");
        }
        PromotionEntity promotionEntity = promotionMapper.toEntity(promotionRequest);
        PromotionEntity promotion = promotionRepository.save(promotionEntity);
        return promotionMapper.toResponse(promotion);
    }
    @Transactional
    public PromotionResponse updatePromotion(Long promotionId,PromotionRequest promotionRequest) {
        PromotionEntity promotionEntity = promotionRepository.findById(promotionId).orElseThrow(() -> new RuntimeException(("Mã khuyến mãi không tồn tại")));
        promotionMapper.updateEntityFromRequest(promotionRequest,promotionEntity);
        promotionEntity.setUpdateAt(LocalDateTime.now());
        PromotionEntity promotion = promotionRepository.save(promotionEntity);
        return promotionMapper.toResponse(promotion);
    }
    @Transactional
    public void deletePromotion(Long promotionId) {
        promotionRepository.deleteById(promotionId);
    }
    @Transactional(readOnly = true)
    public List<PromotionResponse> getPromotions(){
        List<PromotionEntity> promotionEntities = promotionRepository.findAll();
        return promotionEntities.stream().map(promotionMapper::toResponse).collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public PromotionResponse getPromotionById(Long promotionId) {
        PromotionEntity promotionEntity = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new RuntimeException("Mã khuyến mãi không tồn tại"));
        return promotionMapper.toResponse(promotionEntity);
    }
    @Transactional
    public BigDecimal applyPromotion(String codePromotion, BigDecimal orderAmount) {
        PromotionEntity promotion = promotionRepository.findByCodePromotion(codePromotion)
                .orElseThrow(() -> new RuntimeException("Mã khuyến mãi không tồn tại"));
        if (Boolean.FALSE.equals(promotion.getIsActive())) {
            throw new RuntimeException("Mã khuyến mãi đã hết hạn hoặc đã đạt số lượng sử dụng tối đa");
        }
        LocalDateTime now = LocalDateTime.now();
        if (promotion.getStartDate() != null && now.isBefore(promotion.getStartDate())) {
            throw new RuntimeException("Mã khuyến mãi chưa bắt đầu");
        }
        if (promotion.getEndDate() != null && now.isAfter(promotion.getEndDate())) {
            promotion.setIsActive(Boolean.FALSE);
            throw new RuntimeException("Mã khuyến mãi đã hết hạn");
        }
        if (promotion.getMaxUser() != null && promotion.getCurrentUser() != null &&
                promotion.getCurrentUser() >= promotion.getMaxUser()) {
            promotion.setIsActive(Boolean.FALSE);
            throw new RuntimeException("Mã khuyến mãi đã đạt số lượng sử dụng tối đa");
        }
        if (promotion.getMinOrderAmount() != null &&
                orderAmount.compareTo(promotion.getMinOrderAmount()) < 0) {
            throw new RuntimeException("Đơn hàng của bạn chưa đủ điều kiện tối thiểu để áp dụng mã khuyến mãi");
        }
        BigDecimal discount = BigDecimal.ZERO;
        if ("percent".equalsIgnoreCase(promotion.getDiscountType())) {
            discount = orderAmount.multiply(promotion.getPercentDiscountValue())
                    .divide(BigDecimal.valueOf(100));
            if (discount.compareTo(promotion.getMaxDiscountValue()) > 0) {
                discount = promotion.getMaxDiscountValue();
            }
        } else if ("fixed".equalsIgnoreCase(promotion.getDiscountType())) {
            discount = promotion.getMaxDiscountValue();
        }
        promotion.setCurrentUser(
                promotion.getCurrentUser() == null ? 1 : promotion.getCurrentUser() + 1
        );
        if (promotion.getCurrentUser() != null && promotion.getCurrentUser() >= promotion.getMaxUser()) {
            promotion.setIsActive(Boolean.FALSE);
        }
        promotionRepository.save(promotion);
        return discount;
    }
    public void addOneCurrentUserPromotion(PromotionEntity promotion) {
        promotion.setCurrentUser(
                promotion.getCurrentUser() == null ? 1 : promotion.getCurrentUser() + 1
        );
        if (promotion.getCurrentUser() != null && promotion.getCurrentUser() >= promotion.getMaxUser()) {
            promotion.setIsActive(Boolean.FALSE);
        }
        promotionRepository.save(promotion);
    }

}
