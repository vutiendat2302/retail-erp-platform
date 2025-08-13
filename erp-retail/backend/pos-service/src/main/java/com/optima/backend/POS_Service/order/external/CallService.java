package com.optima.backend.POS_Service.order.external;

import com.optima.backend.POS_Service.order.application.dto.request.OrderRequest;
import com.optima.backend.POS_Service.order.application.dto.response.ProductResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CallService {
    RestTemplate restTemplate = new RestTemplate();
    public ProductResponse getProductById(Long id) {
        String url = "http://inventory-service:8080/api/product/" + id;
        ProductResponse productResponse = restTemplate.getForObject(url, ProductResponse.class);
        return productResponse;
    }
}
