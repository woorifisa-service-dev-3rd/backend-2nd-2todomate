package com.spring.todomate.controller;


import com.spring.todomate.dto.UserRequest;
import com.spring.todomate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

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
    public ResponseEntity<String> login(@RequestBody @Validated UserRequest userRequest, HttpSession session) {
        try {
            System.out.println("userRequest = " + userRequest);

            // userService에서 아이디, 비밀번호 확인
            Long userId = userService.login(userRequest);

            if (userId == null) {
                System.out.println("로그인 실패: 아이디와 비밀번호를 확인해주세요.");
                return new ResponseEntity<>("아이디와 비밀번호를 확인해주세요.", HttpStatus.UNAUTHORIZED);
            }
            session.setAttribute("userId", userId);
            System.out.println("로그인 성공, userId = " + userId);
            return new ResponseEntity<>("로그인 성공!", HttpStatus.OK);
        } catch (Exception e) {
            // 예외 처리
            System.err.println("로그인 중 오류 발생: " + e.getMessage());
            return new ResponseEntity<>("서버 오류 발생", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
