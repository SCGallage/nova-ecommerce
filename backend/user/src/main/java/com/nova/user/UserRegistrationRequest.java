package com.nova.user;

public record UserRegistrationRequest(
        String firstName,
        String lastName,
        String email,
        String password,
        String userType
) {
}
