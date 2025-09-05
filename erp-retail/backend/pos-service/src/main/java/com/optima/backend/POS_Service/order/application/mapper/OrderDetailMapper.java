package com.optima.backend.POS_Service.order.application.mapper;

import com.optima.backend.POS_Service.order.application.dto.request.OrderDetailRequest;
import com.optima.backend.POS_Service.order.application.dto.request.OrderRequest;
import com.optima.backend.POS_Service.order.application.dto.response.OrderDetailResponse;
import com.optima.backend.POS_Service.order.application.dto.response.ProductResponse;
import com.optima.backend.POS_Service.order.external.InventoryClient;
import com.optima.backend.POS_Service.order.infrastructure.entity.OrderDetailEntity;
import com.optima.backend.POS_Service.order.infrastructure.entity.OrderEntity;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public  class OrderDetailMapper {
   public OrderDetailEntity toEntity(OrderDetailRequest orderDetailRequest,ProductResponse productResponse,OrderEntity orderEntity) {
       OrderDetailEntity orderDetailEntity = new OrderDetailEntity();
       orderDetailEntity.setProductId(orderDetailRequest.getProductId());
       orderDetailEntity.setQuantity(orderDetailRequest.getQuantity());
       orderDetailEntity.setProductName(productResponse.getName());
       orderDetailEntity.setPrice(productResponse.getPriceSell());
       orderDetailEntity.setOrderEntity(orderEntity);
       return orderDetailEntity;
   }
   public OrderDetailResponse toResponse(OrderDetailEntity orderDetailEntity) {
       OrderDetailResponse orderDetailResponse = new OrderDetailResponse();
       orderDetailResponse.setId(orderDetailEntity.getId());
       orderDetailResponse.setPrice(orderDetailEntity.getPrice());
       orderDetailResponse.setQuantity(orderDetailEntity.getQuantity());
       orderDetailResponse.setProductName(orderDetailEntity.getProductName());
       orderDetailResponse.setTotalAmount(orderDetailEntity.getTotalAmount());
       return orderDetailResponse;
   }
    public List<OrderDetailEntity> toEntityList(List<OrderDetailRequest> requests,List<ProductResponse> productResponses, OrderEntity orderEntity) {
        Map<Long, ProductResponse> productMap = productResponses.stream()
                .collect(Collectors.toMap(
                        ProductResponse::getId,
                        p -> p
                ));
        return requests.stream()
                .map(request -> {
                    ProductResponse product = productMap.get(request.getProductId());
                    if (product == null) {
                        throw new RuntimeException("Product not found for ID: " + request.getProductId());
                    }
                    return toEntity(request, product, orderEntity);
                })
                .collect(Collectors.toList());
    }
    public List<OrderDetailResponse> toResponseList(List<OrderDetailEntity> orderDetailEntities) {
        return orderDetailEntities.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}
