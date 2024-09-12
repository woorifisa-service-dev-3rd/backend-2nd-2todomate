package com.spring.todomate.service;

import com.spring.todomate.dto.UserRequest;
import com.spring.todomate.model.User;
import com.spring.todomate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * 1. 스프링 컨텍스트에 빈으로 등록하기 위한 애노테이션 추가
 * 2. 생성자 자동 주입을 위한 애노테이션 추가
 */
public class UserServiceImpl implements UserService{

    @Override
    public Long login(UserRequest userRequest) {

        // userRepository에서 name과 password
        Optional<User> findUser = userRepository.findByNameAndPassword(userRequest.getName(), userRequest.getPassword());

        // 해당하는 유저 정보가 없는 경우
        if(findUser.isEmpty()) { // 해당하는 유저 정보가 없는 경우
            return null;
        } else {
            return findUser.get().getId();
        }
    }
}
