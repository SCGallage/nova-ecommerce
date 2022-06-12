package com.nova.user;

public record UserDetails(
        Integer Id,
        String firstName,
        String lastName,
        String email
) {
}
