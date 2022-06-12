package com.nova.product;

public record OrderCreateRequest(
        Float total,
        Integer userId
) {
}
