package com.spring.todomate.service;

import com.spring.todomate.dto.UserRequest;

public interface UserService {
    Long login(UserRequest userRequest);
}
