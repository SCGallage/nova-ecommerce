package com.nova.product;

public record ProductAddRequest(
        String name,
        Float price,
        Integer quantity,
        String description
) {
}
