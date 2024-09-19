package com.spring.todomate.dto;


import com.spring.todomate.model.Todo;
import lombok.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoResponse {
    // TodoResponse: 응답해 주는 용도의 DTO 클래스
    // 클라이언트 애플리케이션(FE)에서 투두에 대해 필요한 정보만 작성
    // 정적 팩토리 메소드, 투두 -> DTO(TodoResponse) 변환 메서드

    private Long id;
    private Long dayUntilDue;
    private String title;
    private String summary;
    private String option;
    private LocalDate startDate;
    private LocalDate dueDate;

    public static TodoResponse from (Todo todo) {
        return TodoResponse.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .summary(todo.getSummary())
                .option(todo.getOption().name())
                .startDate(todo.getStartDate())
                .dueDate(todo.getDueDate())
                .dayUntilDue(ChronoUnit.DAYS.between(todo.getStartDate(), todo.getDueDate()))
                .build();
    }
}