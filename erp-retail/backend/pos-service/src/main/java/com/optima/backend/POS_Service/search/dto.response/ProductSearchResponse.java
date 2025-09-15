package com.optima.backend.POS_Service.search.dto.reponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductSearchResponse {
    Long Id;
    String Name;
    Double match_score;
    Double Score;
    Long Sales;
}