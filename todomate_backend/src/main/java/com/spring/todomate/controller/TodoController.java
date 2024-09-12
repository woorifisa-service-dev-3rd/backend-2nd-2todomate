package com.spring.todomate.controller;

import com.spring.todomate.dto.TodoRequest;
import com.spring.todomate.dto.TodoResponse;
import com.spring.todomate.service.TodoService;
import com.spring.todomate.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private final TodoService todoService;
    @Autowired
    private final UserService userService;

    // TODO: response를 사용하여 클라이언트에게 응답하고, 새로운 todo를 생성할 때는 request를 받아 처리한다
    // TODO: log - AOP로 뺴자

    // 세션
    private Long getUserIdFromSession (HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        return 1L; // 원래는 userId인데, 테스트용으로 userId 1L 값을 넣어둠
    }

    @GetMapping("/list")
    public ResponseEntity<List<TodoResponse>> getTodos(HttpSession session){
        log.info("getTodos()..."); // AOP
        Long userId = getUserIdFromSession(session);
        List<TodoResponse> todos;
        todos = todoService.getAllTodos(userId);
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<TodoResponse> addTodo(HttpSession session, @RequestBody TodoRequest todoRequest) {
        log.info("addTodo()..."); // AOP
        Long userId = getUserIdFromSession(session);
        TodoResponse todoResponse = todoService.addTodoDetails(userId, todoRequest);
        return new ResponseEntity<>(todoResponse, HttpStatus.CREATED);
    }

    @PostMapping("/update/{todoId}")
    public ResponseEntity<TodoResponse> updateTodo(HttpSession session,@PathVariable Long todoId, @RequestBody TodoRequest todoRequest) {
        log.info("updateTodo()..."); // AOP
        Long userId = getUserIdFromSession(session);
        TodoResponse todoResponse = todoService.updateTodoDetails(userId, todoId, todoRequest);
        return new ResponseEntity<>(todoResponse, HttpStatus.OK);
    }

    @PostMapping("/delete/{todoId}")
    public ResponseEntity<String> deleteTodo(HttpSession session, @PathVariable Long todoId){
        log.info("deleteTodo()...");
        Long userId = getUserIdFromSession(session);
        todoService.delete(userId, todoId);
        return new ResponseEntity<>(todoId + "번에 해당하는 todo를 삭제하였습니다.", HttpStatus.OK);
    }
}
