package com.spring.todomate.repository;

import com.spring.todomate.model.Todo;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface TodoRepository extends PagingAndSortingRepository<Todo, Long> {

    List<Todo> findByUserId(Long userId);
}
