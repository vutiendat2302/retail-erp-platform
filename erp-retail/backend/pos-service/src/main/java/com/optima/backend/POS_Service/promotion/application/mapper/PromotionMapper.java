package com.optima.backend.POS_Service.promotion.application.mapper;

import com.optima.backend.POS_Service.promotion.application.dto.request.PromotionRequest;
import com.optima.backend.POS_Service.promotion.application.dto.response.PromotionResponse;
import com.optima.backend.POS_Service.promotion.infrastructure.entity.PromotionEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PromotionMapper {
    PromotionEntity toEntity(PromotionRequest promotionRequest);
    @Mapping(target = "createdAt",expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "updatedAt",expression = "java(java.time.LocalDateTime.now())")
    PromotionResponse toResponse(PromotionEntity promotionEntity);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(PromotionRequest request, @MappingTarget PromotionEntity entity);
}
