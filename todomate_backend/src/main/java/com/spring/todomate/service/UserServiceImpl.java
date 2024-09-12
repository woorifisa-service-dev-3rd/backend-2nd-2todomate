package com.spring.todomate.service;

import com.spring.todomate.dto.UserRequest;
import com.spring.todomate.dto.UserResponse;
import com.spring.todomate.model.User;
import com.spring.todomate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public Long login(UserRequest userRequest) {

        Optional<User> findUser = userRepository.findByNameAndPassword(userRequest.getName(), userRequest.getPassword());

        // 해당하는 유저 정보가 없는 경우
        if(findUser.isEmpty()) { // 해당하는 유저 정보가 없는 경우
            return null;
        } else {
            return findUser.get().getId();
        }
    }
}
