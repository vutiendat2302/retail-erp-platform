package com.optima.backend.POS_Service.search.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchService {
    RestTemplate restTemplate = new RestTemplate();
    public String search(String query) {
        String url = "http://localhost:5001/search?query=" + query;
        return restTemplate.getForObject(url, String.class);
    }
}
