package com.optima.backend.POS_Service.order.application.mapper;

import com.optima.backend.POS_Service.order.application.dto.request.OrderDetailRequest;
import com.optima.backend.POS_Service.order.application.dto.request.OrderRequest;
import com.optima.backend.POS_Service.order.application.dto.response.OrderResponse;
import com.optima.backend.POS_Service.order.application.dto.response.ProductResponse;
import com.optima.backend.POS_Service.order.external.InventoryClient;
import com.optima.backend.POS_Service.order.infrastructure.entity.OrderDetailEntity;
import com.optima.backend.POS_Service.order.infrastructure.entity.OrderEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@Component
@Getter
@Setter
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderMapper {
   OrderDetailMapper orderDetailMapper;
   InventoryClient inventoryClient;
   public OrderEntity toEntity(OrderRequest orderRequest) {
       OrderEntity orderEntity = new OrderEntity();
       orderEntity.setNote(orderRequest.getNote());
       List<OrderDetailEntity> orderDetails = new ArrayList<>();
       for (OrderDetailRequest request : orderRequest.getOrderDetails()) {
           ProductResponse product = inventoryClient.getProduct(request.getProductId());
           if (product == null) {
               throw new RuntimeException("Product not found for ID: " + request.getProductId());
           }
           OrderDetailEntity detailEntity = orderDetailMapper.toEntity(request, product, orderEntity);
           orderDetails.add(detailEntity);
       }

       orderEntity.setOrderDetails(orderDetails);
       return orderEntity;
   }
   public OrderResponse toResponse(OrderEntity orderEntity) {
       OrderResponse orderResponse = new OrderResponse();
       orderResponse.setId(orderEntity.getId());
       orderResponse.setOrderDetails(orderDetailMapper.toResponseList(orderEntity.getOrderDetails()));
       orderResponse.setTaxAmount(orderEntity.getTaxAmount());
       orderResponse.setFinalAmountAfterTax(orderEntity.getFinalAmountAfterTax());
       orderResponse.setFinalAmountBeforeTax(orderEntity.getFinalAmountBeforeTax());
       return orderResponse;
   }
}
