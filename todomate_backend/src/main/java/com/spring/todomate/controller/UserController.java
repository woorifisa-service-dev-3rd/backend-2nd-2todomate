package com.spring.todomate.controller;


import com.spring.todomate.dto.UserRequest;
import com.spring.todomate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 1. RestController로 만들기 위한 애노테이션 추가
 * 2. 생성자 자동 주입을 위한 애노테이션 추가
 * 3. RequestMapping을 위한 애노테이션 추가
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    /**
     * PostMapping을 위한 애노테이션 추가
     * RequestBody로 UserRequest 받아오는 파라미터 추가
     *
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Validated UserRequest userRequest) {

        System.out.println("login");

        // userService에서 아이디, 비밀번호 확인
        Long userId = userService.login(userRequest);

        if(userId == null) return new ResponseEntity<>("아이디와 비밀번호를 확인해주세요.", HttpStatus.UNAUTHORIZED);

        HttpHeaders headers = new HttpHeaders();
        headers.add("userId", userId.toString());
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }
}
