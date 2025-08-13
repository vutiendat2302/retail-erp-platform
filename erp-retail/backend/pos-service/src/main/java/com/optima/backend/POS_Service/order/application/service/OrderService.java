package com.optima.backend.POS_Service.order.application.service;

import com.optima.backend.POS_Service.order.application.dto.request.OrderDetailRequest;
import com.optima.backend.POS_Service.order.application.dto.request.OrderRequest;
import com.optima.backend.POS_Service.order.application.dto.response.OrderResponse;
import com.optima.backend.POS_Service.order.application.dto.response.ProductResponse;
import com.optima.backend.POS_Service.order.application.mapper.OrderDetailMapper;
import com.optima.backend.POS_Service.order.application.mapper.OrderMapper;
import com.optima.backend.POS_Service.order.external.CallService;
import com.optima.backend.POS_Service.order.external.InventoryClient;
import com.optima.backend.POS_Service.order.infrastructure.entity.OrderDetailEntity;
import com.optima.backend.POS_Service.order.infrastructure.entity.OrderEntity;
import com.optima.backend.POS_Service.order.infrastructure.entity.OrderStatusEntity;
import com.optima.backend.POS_Service.order.infrastructure.repository.OrderDetailRepository;
import com.optima.backend.POS_Service.order.infrastructure.repository.OrderRepository;
import com.optima.backend.POS_Service.order.infrastructure.repository.OrderStatusRepository;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@Service
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {
    OrderRepository orderRepository;
    OrderStatusRepository orderStatusRepository;
    InventoryClient inventoryClient;
    CallService callService;
    OrderMapper orderMapper;
    OrderDetailMapper orderDetailMapper;
    OrderDetailRepository orderDetailRepository;
    @Transactional
    public OrderResponse addToCart(OrderRequest orderRequest,Long customerId) {
        if(orderRequest.getOrderDetails() == null) {
            throw new IllegalArgumentException("Bạn phải thêm ít nhất 1 sản phẩm");
        }
        if (customerId == null) {
            customerId = 1L; // Giả định customerId = 1 cho test
        }
        OrderStatusEntity pendingStatus = orderStatusRepository.findByCodeStatus("PENDING");
        Optional<OrderEntity> optionalOrder = orderRepository.findByCustomerIdAndOrderStatus_codeStatus(customerId,"PENDING");
        OrderEntity orderEntity;
        if (optionalOrder.isEmpty()) {
            orderEntity = new OrderEntity();
            orderEntity.setCustomerId(customerId);
            orderEntity.setOrderStatus(pendingStatus);
            orderEntity.setOrderDate(LocalDateTime.now());
            orderEntity.setCreatedAt(LocalDateTime.now());
            orderEntity.setNote(orderRequest.getNote());
            orderEntity.setOrderDetails(new ArrayList<>());
            orderEntity.setShipAmount(BigDecimal.ZERO); // Giả định phí vận chuyển
            orderEntity.setPromotionDiscount(BigDecimal.ZERO); // Giả định giảm giá
        } else {
            orderEntity = optionalOrder.get();
            // Cập nhật note nếu có
            if (orderRequest.getNote() != null) {
                orderEntity.setNote(orderRequest.getNote());
            }
        }
        for (OrderDetailRequest detailRequest : orderRequest.getOrderDetails()) {
            ProductResponse product = callService.getProductById(detailRequest.getProductId());
            Optional<OrderDetailEntity> existingDetail = orderEntity.getOrderDetails().stream()
                    // Sử dụng Objects.equals() là cách an toàn nhất để so sánh hai đối tượng Long có thể null
                    .filter(detail -> java.util.Objects.equals(detail.getProductId(), product.getId()))
                    .findFirst();

            if (existingDetail.isPresent()) {
                // Cập nhật số lượng
                OrderDetailEntity detail = existingDetail.get();
                detail.setQuantity(detail.getQuantity() + detailRequest.getQuantity());
                detail.setUpdatedAt(LocalDateTime.now());
            } else {
                // Tạo mới OrderDetailEntity bằng mapper
                OrderDetailEntity detail = orderDetailMapper.toEntity(detailRequest, product, orderEntity);
                orderEntity.addOrderDetail(detail);
            }
        }
        OrderEntity saved = orderRepository.save(orderEntity);
        return orderMapper.toResponse(saved);
    }
    @Transactional
    public OrderResponse minusQuantity(Long customerId, Long productId, Long quantityToRemove) {
        if (customerId == null) {
            customerId = 1L;
        }
        if (productId == null) {
            throw new IllegalArgumentException("sản phẩm không được để trống");
        }
        if (quantityToRemove == null || quantityToRemove <= 0) {
            throw new IllegalArgumentException("Số lượng sản phẩm phải lớn hơn 0");
        }

        OrderStatusEntity pendingStatus = orderStatusRepository.findByCodeStatus("PENDING");

        OrderEntity orderEntity = orderRepository.findByCustomerIdAndOrderStatus_codeStatus(customerId,"PENDING")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng của khách hàng"));

        if (!orderEntity.getCustomerId().equals(customerId)) {
            throw new RuntimeException("Không có quyền truy cập giỏ hàng");
        }

        Optional<OrderDetailEntity> detailToRemove = orderEntity.getOrderDetails().stream()
                .filter(detail -> detail.getProductId() != null ? detail.getProductId().equals(productId) :
                        detail.getProductName().equals(
                                callService.getProductById(productId).getName()))
                .findFirst();

        if (detailToRemove.isEmpty()) {
            throw new RuntimeException("Sản phẩm không tồn tại trong giỏ hàng: " + productId);
        }

        OrderDetailEntity detail = detailToRemove.get();
        Long newQuantity = detail.getQuantity() - quantityToRemove;
        if (newQuantity <= 0) {
            orderEntity.removeOrderDetail(detail);
        } else {
            detail.setQuantity(newQuantity);
            detail.setUpdatedAt(LocalDateTime.now());
        }

        if (orderEntity.getOrderDetails().isEmpty()) {
            orderRepository.delete(orderEntity);
            return null;
        }

        orderEntity.setUpdateAt(LocalDateTime.now());
        orderEntity = orderRepository.save(orderEntity);
        return orderMapper.toResponse(orderEntity);
    }
    @Transactional
    public OrderResponse addQuantity(Long customerId, Long productId, Long quantityToAdd) {
        if (customerId == null) {
            customerId = 1L;
        }
        if (productId == null) {
            throw new IllegalArgumentException("sản phẩm không được để trống");
        }
        if (quantityToAdd == null || quantityToAdd <= 0) {
            throw new IllegalArgumentException("Số lượng sản phẩm phải lớn hơn 0");
        }
        OrderStatusEntity pendingStatus = orderStatusRepository.findByCodeStatus("PENDING");

        OrderEntity orderEntity = orderRepository.findByCustomerIdAndOrderStatus_codeStatus(customerId,"PENDING")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng của khách hàng"));

        if (!orderEntity.getCustomerId().equals(customerId)) {
            throw new RuntimeException("Không có quyền truy cập giỏ hàng");
        }

        Optional<OrderDetailEntity> detailToAdd = orderEntity.getOrderDetails().stream()
                .filter(detail -> detail.getProductId() != null ? detail.getProductId().equals(productId) :
                        detail.getProductName().equals(
                                callService.getProductById(productId).getName()))
                .findFirst();

        if (detailToAdd.isEmpty()) {
            throw new RuntimeException("Sản phẩm không tồn tại trong giỏ hàng: " + productId);
        }
        OrderDetailEntity detail = detailToAdd.get();
        Long newQuantity = detail.getQuantity() + quantityToAdd;
        detail.setQuantity(newQuantity);
        detail.setUpdatedAt(LocalDateTime.now());
        orderEntity.setUpdateAt(LocalDateTime.now());
        orderEntity = orderRepository.save(orderEntity);
        return orderMapper.toResponse(orderEntity);
    }
    @Transactional
    public OrderResponse removeFromCart(Long customerId, Long productId) {
        if (customerId == null) {
            customerId = 1L;
        }
        if (productId == null) {
            throw new IllegalArgumentException("sản phẩm không được để trống");
        }
        OrderStatusEntity pendingStatus = orderStatusRepository.findByCodeStatus("PENDING");

        OrderEntity orderEntity = orderRepository.findByCustomerIdAndOrderStatus_codeStatus(customerId, "PENDING")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng của khách hàng"));

        if (!orderEntity.getCustomerId().equals(customerId)) {
            throw new RuntimeException("Không có quyền truy cập giỏ hàng");
        }

        Optional<OrderDetailEntity> detailToRemove = orderEntity.getOrderDetails().stream()
                .filter(detail -> detail.getProductId() != null ? detail.getProductId().equals(productId) :
                        detail.getProductName().equals(
                                callService.getProductById(productId).getName()))
                .findFirst();

        if (detailToRemove.isEmpty()) {
            throw new RuntimeException("Sản phẩm không tồn tại trong giỏ hàng: " + productId);
        }
        OrderDetailEntity detail = detailToRemove.get();
        orderDetailRepository.deleteById(detail.getId());
        orderEntity.removeOrderDetail(detail);
        orderEntity.setOrderDate(LocalDateTime.now());
        orderEntity = orderRepository.save(orderEntity);
        return orderMapper.toResponse(orderEntity);
    }
    @Transactional
    public OrderResponse checkout(Long orderId, Long customerId, OrderRequest directCheckoutRequest) {
        if (customerId == null) {
            customerId = 1L;
        }

        OrderEntity orderEntity;

        if (orderId != null) {
            orderEntity = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại: " + orderId));

            if (!orderEntity.getCustomerId().equals(customerId)) {
                throw new RuntimeException("Không có quyền truy cập đơn hàng");
            }

            OrderStatusEntity confirmedStatus = orderStatusRepository.findByCodeStatus("CONFIRMED");
            orderEntity.setOrderStatus(confirmedStatus);
            orderEntity.setUpdateAt(LocalDateTime.now());
        } else {
            if (directCheckoutRequest == null || directCheckoutRequest.getOrderDetails().isEmpty()) {
                throw new IllegalArgumentException("Danh sách sản phẩm không được để trống");
            }

            OrderStatusEntity confirmedStatus = orderStatusRepository.findByCodeStatus("CONFIRMED");

            orderEntity = new OrderEntity();
            orderEntity.setCustomerId(customerId);
            orderEntity.setOrderStatus(confirmedStatus);
            orderEntity.setOrderDate(LocalDateTime.now());
            orderEntity.setCreatedAt(LocalDateTime.now());
            orderEntity.setUpdateAt(LocalDateTime.now());
            orderEntity.setNote(directCheckoutRequest.getNote());
            orderEntity.setPromotionDiscount(BigDecimal.ZERO);

            for (OrderDetailRequest detailRequest : directCheckoutRequest.getOrderDetails()) {
                ProductResponse product = callService.getProductById(detailRequest.getProductId());
                OrderDetailEntity detail = orderDetailMapper.toEntity(detailRequest, product, orderEntity);
                orderEntity.addOrderDetail(detail);
            }
        }

        orderEntity = orderRepository.save(orderEntity);
        return orderMapper.toResponse(orderEntity);
    }
}
