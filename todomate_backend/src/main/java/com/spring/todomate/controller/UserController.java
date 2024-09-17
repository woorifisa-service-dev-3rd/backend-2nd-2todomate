package com.spring.todomate.controller;


import com.spring.todomate.dto.UserRequest;
import com.spring.todomate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;


/**
 * 1. RestController로 만들기 위한 애노테이션 추가
 * 2. 생성자 자동 주입을 위한 애노테이션 추가
 * 3. RequestMapping을 위한 애노테이션 추가
 */
@RestController
@RequestMapping
@RequiredArgsConstructor
public class UserController {


    public final UserService userService;
    /**
     * PostMapping을 위한 애노테이션 추가("/login" 으로 매핑)
     * RequestBody로 UserRequest 받아오는 파라미터 추가, 유효성 검사를 위한 애노테이션 추가
     * HttpSession 정보를 가져오기 위한 파라미터 추가
     */


    @Validated
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserRequest userRequest, HttpSession session) {

        // userService에서 아이디, 비밀번호 확인
        Long userId = userService.login(userRequest);

        /**
         * userId가 null일 경우
         * ResponseEntity에 "아이디와 비밀번호를 확인해주세요."라는 메세지를 담아서
         * 상태코드 401 Unauthorized로 반환
         */
        if(userId == null) {
            return new ResponseEntity<>("아이디와 비밀번호를 확인해주세요.", HttpStatus.UNAUTHORIZED );
        };

         // 로그인 정보를 세션에 저장

        session.setAttribute("userId", userId);
        return new ResponseEntity<>("로그인 성공!", HttpStatus.OK);
    }
}
