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
public class UserController {

    /**
     * PostMapping을 위한 애노테이션 추가("/login" 으로 매핑)
     * RequestBody로 UserRequest 받아오는 파라미터 추가
     *
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Validated UserRequest userRequest) {

        // userService에서 아이디, 비밀번호 확인
        Long userId = userService.login(userRequest);

        /**
         * userId가 null일 경우
         * ResponseEntity에 "아이디와 비밀번호를 확인해주세요."라는 메세지를 담아서
         * 상태코드 401 Unauthorized로 반환
         */
        if(userId == null) return null;

        /**
         * 헤더에 userId를 담아서 반환
         */
        HttpHeaders headers;
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }
}
