package com.spring.todomate.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import javax.validation.constraints.NotNull;

import java.time.LocalDate;

@Getter
@ToString
@Builder
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

    @JsonCreator
    public static TodoRequest create(
            @JsonProperty("title") String title,
            @JsonProperty("summary") String summary,
            @JsonProperty("option") String option,
            @JsonProperty("startDate") LocalDate startDate,
            @JsonProperty("dueDate") LocalDate dueDate) {
        return TodoRequest.builder()
                .title(title)
                .summary(summary)
                .option(option)
                .startDate(startDate)
                .dueDate(dueDate)
                .build();
    }
}