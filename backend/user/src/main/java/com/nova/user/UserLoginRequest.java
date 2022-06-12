package com.nova.user;

public record UserLoginRequest(
        String email,
        String password
) {
}
