package com.spring.todomate.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import javax.validation.constraints.NotNull;

import java.time.LocalDate;

@Getter
@ToString
@NoArgsConstructor
public class TodoRequest {

    @NotNull
    private String title;

    @NotNull
    private String summary;

    @NotNull
    private String option;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate dueDate;

}
