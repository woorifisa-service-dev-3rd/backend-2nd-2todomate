package com.spring.todomate.service;

import com.spring.todomate.dto.DiaryRequest;
import com.spring.todomate.dto.DiaryResponse;
import com.spring.todomate.exception.DiaryNotFoundException;
import com.spring.todomate.exception.UserNotFoundException;
import com.spring.todomate.model.Diary;
import com.spring.todomate.model.User;
import com.spring.todomate.repository.DiaryRepository;
import com.spring.todomate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    @Override
    public List<DiaryResponse> findAll(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        List<Diary> diaries = diaryRepository.findAllByUserId(user.getId());
        List<DiaryResponse> diaryResponses = diaries.stream().map(DiaryResponse::from)
                .collect(Collectors.toList());
        return diaryResponses;
    }


    @Override
    public DiaryResponse addDiary(Long userId, DiaryRequest diaryRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Diary diary = Diary.from(diaryRequest, user);
        Diary savedDiary = diaryRepository.save(diary);
        DiaryResponse diaryResponse = DiaryResponse.from(savedDiary);
        return diaryResponse;
    }

    @Override
    public DiaryResponse updateDiary(Long userId, Long diaryId, DiaryRequest diaryRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new DiaryNotFoundException(diaryId));
        diary.updateDiary(diaryRequest);
        DiaryResponse diaryResponse = DiaryResponse.from(diary);
        return diaryResponse;
    }

    @Override
    public DiaryResponse findById(Long userId, Long diaryId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new DiaryNotFoundException(diaryId));
        return DiaryResponse.from(diary);
    }

    @Override
    public Diary deleteDiary(Long userId, Long diaryId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new DiaryNotFoundException(diaryId));
        diaryRepository.deleteById(diary.getId());
        return diary;
    }
}