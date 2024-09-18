package com.spring.todomate.controller;

import com.spring.todomate.dto.DiaryRequest;
import com.spring.todomate.dto.DiaryResponse;
import com.spring.todomate.model.Diary;
import com.spring.todomate.service.DiaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/diaries")
public class DiaryController {

    private final DiaryService diaryService;

    private Long getUserIdFromSession(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new IllegalArgumentException("userId doesn't exist");
        }
        return userId;
    }

    @GetMapping("/list")
    public ResponseEntity<List<DiaryResponse>> findAll(HttpSession session) {
        Long userId = getUserIdFromSession(session);
        List<DiaryResponse> diaries = diaryService.findAll(userId);
        return new ResponseEntity<>(diaries, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiaryResponse> getDiaryById(HttpSession session, @PathVariable Long id) {
        Long userId = getUserIdFromSession(session);
        DiaryResponse diary = diaryService.findById(userId, id);
        log.info("foundDiary = " + diary);
        return new ResponseEntity<>(diary, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<DiaryResponse> addDiary(HttpSession session, @RequestBody @Valid DiaryRequest diaryRequest) {
        Long userId = getUserIdFromSession(session);
        DiaryResponse addedDiary = diaryService.addDiary(userId, diaryRequest);
        log.info("addedDiary = " + addedDiary);
        return new ResponseEntity<>(addedDiary, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiaryResponse> editDiary(HttpSession session, @PathVariable Long id, @RequestBody @Valid DiaryRequest diaryRequest) {
        Long userId = getUserIdFromSession(session);
        DiaryResponse updatedDiary = diaryService.updateDiary(userId, id, diaryRequest);
        log.info("updatedDiary = " + updatedDiary);
        return new ResponseEntity<>(updatedDiary, HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> deleteDiary(HttpSession session, @PathVariable Long id) {
        Long userId = getUserIdFromSession(session);
        Diary deletedDiary = diaryService.deleteDiary(userId, id);
        log.info("deletedDiary = " + deletedDiary);
        return new ResponseEntity<>("Deleted successfully", HttpStatus.OK);
    }
}
