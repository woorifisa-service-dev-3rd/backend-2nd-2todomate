package com.spring.todomate.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UserRequest {

    @NotNull
    private String name;

    @NotNull
    private String password;
}
