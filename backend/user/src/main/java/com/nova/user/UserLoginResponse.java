package com.nova.user;

public record UserLoginResponse(
        Integer Id,
        String firstName,
        String lastName,
        Boolean validity,
        String userType
) {
}
