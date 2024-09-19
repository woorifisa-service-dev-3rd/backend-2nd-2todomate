package com.spring.todomate.service;

import com.spring.todomate.dto.DiaryRequest;
import com.spring.todomate.dto.DiaryResponse;
import com.spring.todomate.model.Diary;

import java.util.List;

public interface DiaryService {
    List<DiaryResponse> findAll(Long userId);
    DiaryResponse addDiary(Long userId, DiaryRequest diaryRequest);
    DiaryResponse updateDiary(Long userId, Long diaryId, DiaryRequest diaryRequest);
    DiaryResponse findById(Long userId, Long diaryId);
    Diary deleteDiary(Long userId, Long diaryId);
}
