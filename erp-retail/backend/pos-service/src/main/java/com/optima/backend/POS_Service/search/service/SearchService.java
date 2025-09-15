package com.optima.backend.POS_Service.search.service;

import com.optima.backend.POS_Service.search.dto.reponse.ProductSearchResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchService {
    RestTemplate restTemplate = new RestTemplate();
    public List<ProductSearchResponse> search(String query) {
        String url = "http://host.docker.internal:5001/api/search?query=" + query;
        ResponseEntity<List<ProductSearchResponse>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<ProductSearchResponse>>() {},
                query
        );
        return response.getBody();
    }
}