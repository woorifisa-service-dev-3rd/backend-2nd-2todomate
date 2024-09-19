package com.spring.todomate.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@ToString
@Builder
public class DiaryRequest {
    
    @NotNull
    private String title;

    @NotNull
    private String content;

    @JsonCreator
    public static DiaryRequest create(
            @JsonProperty("title") String title,
            @JsonProperty("content") String content) {
        return DiaryRequest.builder()
                .title(title)
                .content(content)
                .build();
    }
}
