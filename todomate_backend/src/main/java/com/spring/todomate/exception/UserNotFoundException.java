package com.spring.todomate.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super(id + "에 해당하는 userId가 존재하지 않습니다.");
    }
}
