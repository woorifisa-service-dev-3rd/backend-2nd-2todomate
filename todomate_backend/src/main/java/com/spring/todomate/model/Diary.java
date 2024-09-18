package com.spring.todomate.model;
import com.spring.todomate.dto.DiaryRequest;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@ToString
@Entity
@Getter
@Setter
@Table(name="diaries")
@AttributeOverride(name = "id", column = @Column(name = "diary_id"))
public class Diary extends BaseEntity{

    @Column(name = "diary_title")
    private String title;

    @Column(name = "diary_content")
    private String content;

    @Column(name = "diary_date")
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "users_user_id")
    private User user;

    public void updateDiary(DiaryRequest diaryToUpdate) {
        this.title = diaryToUpdate.getTitle();
        this.content = diaryToUpdate.getContent();
    }

    public static Diary from(DiaryRequest diaryRequest, User user) {
        return Diary.builder()
                .title(diaryRequest.getTitle())
                .content(diaryRequest.getContent())
                .date(LocalDate.now())
                .user(user)
                .build();
    }
}
