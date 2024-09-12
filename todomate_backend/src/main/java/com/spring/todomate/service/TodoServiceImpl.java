package com.spring.todomate.service;


import com.spring.todomate.dto.TodoRequest;
import com.spring.todomate.dto.TodoResponse;
import com.spring.todomate.model.Todo;
import com.spring.todomate.model.User;
import com.spring.todomate.repository.TodoRepository;
import com.spring.todomate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    @Override
    public TodoResponse addTodoDetails(Long userId, TodoRequest todoRequest) {
        // 1. userId null 여부 확인
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("런타임 에러")
        );

        // 2. todo 객체 만들기
        Todo todo = Todo.from(todoRequest);
        todo.setDayUntilDue(ChronoUnit.DAYS.between(todo.getStartDate(), todo.getDueDate()));
        todo.setUser(user);

        // 3. 저장
        Todo saveTodo = todoRepository.save(todo);

        // 4. response로 바꾸기
        return TodoResponse.from(saveTodo);
    }

    public List<TodoResponse> getAllTodos(Long id) {
        // 1. todoRepository에서 findAll() => return List<Todo>
        List<Todo> todos = todoRepository.findByUserId(id);

        // 2. List<Todo> -> <TodoResponse>로 바꾸기 (from 메서드를 TodoResponse에 만들기)
        List<TodoResponse> todoResponses = todos.stream().map(TodoResponse::from).collect(Collectors.toList());
        for (TodoResponse todoResponse: todoResponses) {
            Long daysBetween = ChronoUnit.DAYS.between(todoResponse.getStartDate(), todoResponse.getDueDate());
            todoResponse.setDayUntilDue(daysBetween);
        }
        return todoResponses;
    }

    @Override
    public TodoResponse updateTodoDetails(Long userId, Long todoId, TodoRequest todoRequest) {
        // 1. userId null 여부 확인
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("런타임 에러"));

        // 2. todo 객체 가져오기 -> todoId값을 기준으로 찾아서
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new RuntimeException("런타임 에러"));
        todo.setDayUntilDue(ChronoUnit.DAYS.between(todo.getStartDate(), todo.getDueDate()));

        // 3. 가져온 거에 업데이트하기
        // 4. todorepository에 save하기
        todo.update(todoRequest);
        
        // 5. todoresponse로 변환해서 return하기
        return TodoResponse.from(todo);
    }

    public void delete(Long userId, Long todoId){
        // 1. user null 여부 확인
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당하는 user가 없습니다. user="+userId));

        // 2. todoId값 기준으로 객체 가져오기
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new RuntimeException("해당하는 todo id가 없습니다. todoId="+todoId));

        // 3. 가져온 거 삭제하기
        // 4. todorepository에 delete 반영하기
        todoRepository.deleteById(todo.getId());
    }

        public Todo getTodoById(Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Todo not found with id " + id));
    }
    
}
