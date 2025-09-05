package com.optima.backend.POS_Service.promotion.infrastructure.repository;

import com.optima.backend.POS_Service.promotion.infrastructure.entity.PromotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionRepository extends JpaRepository<PromotionEntity, Long> {
    boolean existsByCodePromotion(String codePromotion);
    Optional<PromotionEntity> findByCodePromotion(String codePromotion);
    List<PromotionEntity> findByIsActiveTrue();
}
