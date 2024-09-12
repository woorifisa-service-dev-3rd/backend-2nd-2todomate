package com.spring.todomate.exception;

public class DiaryNotFoundException extends RuntimeException {
    public DiaryNotFoundException(Long id) {
        super(id + "에 해당하는 diaryId가 존재하지 않습니다.");
    }
}
