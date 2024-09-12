package com.spring.todomate.repository;

import com.spring.todomate.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * name과 password로 user 찾기
     */
}
