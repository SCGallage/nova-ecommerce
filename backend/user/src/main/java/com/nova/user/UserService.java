package com.nova.user;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;

    public void registerUser(UserRegistrationRequest userRegistrationRequest) {

        User user = User.builder()
                .firstName(userRegistrationRequest.firstName())
                .lastName(userRegistrationRequest.lastName())
                .email(userRegistrationRequest.email())
                .password(userRegistrationRequest.password())
                .userType(userRegistrationRequest.userType()).build();

        userRepository.save(user);

    }

    public UserLoginResponse loginUser(UserLoginRequest userLoginRequest) {
        User user = userRepository.findByEmail(userLoginRequest.email());

        if (user == null)
            return new UserLoginResponse(null, null, null, false, null);

        if (user.getPassword().equals(userLoginRequest.password()))
            return new UserLoginResponse(user.getId(), user.getFirstName(), user.getLastName(), true, user.getUserType());

        return new UserLoginResponse(null, null, null, false, null);
    }

    public List<UserDetails> getAllUsers() {
        List<User> userList = userRepository.findAll();
        List<UserDetails> userDetailsList = new ArrayList<>();
        userList.forEach((user -> {
            userDetailsList.add(
                    new UserDetails(
                            user.getId(),
                            user.getFirstName(),
                            user.getLastName(),
                            user.getEmail())
            );
        }));
        return userDetailsList;
    }
}
