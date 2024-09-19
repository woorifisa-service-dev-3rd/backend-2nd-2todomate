package com.spring.todomate.dto;

import com.spring.todomate.model.Diary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@Builder
@ToString
public class DiaryResponse {
    private Long id;
    private String title;
    private String content;
    private LocalDate date;

    public static DiaryResponse from (Diary diary) {
        return DiaryResponse.builder()
                .id(diary.getId())
                .title(diary.getTitle())
                .content(diary.getContent())
                .date(diary.getDate())
                .build();
    }
}