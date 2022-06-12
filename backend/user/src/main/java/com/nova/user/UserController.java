package com.nova.user;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("api/v1/user")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping(value = "/register")
    public void registerUser(@RequestBody UserRegistrationRequest userRegistrationRequest) {
        log.info("customer first name {}", userRegistrationRequest.firstName());
        userService.registerUser(userRegistrationRequest);
    }

    @PostMapping(value = "/login")
    public UserLoginResponse userLogin(@RequestBody UserLoginRequest userLoginRequest) {
        /*User user = User.builder()
                .firstName("Sanka")
                .lastName("Gallage")
                .password("password")
                .userType("admin")
                .build();

        if (userLoginRequest.password().equals(user.getPassword()))
            return new UserLoginResponse(true, user.getUserType());

        return new UserLoginResponse(false, null);*/
        return userService.loginUser(userLoginRequest);
    }

    @GetMapping
    public List<UserDetails> getAllUsers() {
        return userService.getAllUsers();
    }



}
