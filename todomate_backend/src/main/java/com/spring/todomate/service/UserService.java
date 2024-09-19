package com.spring.todomate.service;

import com.spring.todomate.dto.UserRequest;
import com.spring.todomate.model.User;

public interface UserService {
    User findById(Long id);
    Long login(UserRequest userRequest);
}
