package com.spring.todomate.service;

import com.spring.todomate.dto.TodoRequest;
import com.spring.todomate.dto.TodoResponse;
import com.spring.todomate.model.Todo;

import java.util.List;

public interface TodoService {
    TodoResponse addTodoDetails(Long userId, TodoRequest todoRequest);
    TodoResponse updateTodoDetails(Long userId, Long todoId, TodoRequest todoRequest);
    List<TodoResponse> getAllTodos(Long id);
    Todo getTodoById(Long id);
    void delete(Long userId, Long todoId);
}
