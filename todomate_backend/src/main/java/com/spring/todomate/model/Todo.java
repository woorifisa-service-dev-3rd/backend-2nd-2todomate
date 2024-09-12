package com.spring.todomate.model;

import com.spring.todomate.dto.TodoRequest;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@SuperBuilder
@ToString
@Entity
@Getter
@Table(name="todos")
@AttributeOverride(name= "id", column = @Column(name = "todo_id"))
public class Todo extends BaseEntity{

    // DB와 매핑하지 않음
    @Transient
    private Long dayUntilDue;

    @Column(name = "todo_title", nullable = false)
    private String title;

    @Column(name = "todo_summary", nullable = false)
    private String summary;

    @Enumerated(EnumType.STRING)
    @Column(name = "todo_options", nullable = false)
    private Option option;

    @Column(name = "todo_startdate", nullable = false)
    private LocalDate startDate;

    @Column(name = "todo_duedate", nullable = false)
    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name="users_user_id")
    private User user;

    public static Todo from(User user, TodoRequest todoRequest) {
        return Todo.builder()
                .title(todoRequest.getTitle())
                .summary(todoRequest.getSummary())
                .option(Option.valueOf(todoRequest.getOption()))
                .startDate(todoRequest.getStartDate())
                .dueDate(todoRequest.getDueDate())
                .user(user)
                .dayUntilDue(ChronoUnit.DAYS.between(todoRequest.getStartDate(), todoRequest.getDueDate()))
                .build();
    }

    public void update(TodoRequest todoRequest) {
        this.title = todoRequest.getTitle();
        this.summary = todoRequest.getSummary();
        this.option = Option.valueOf(todoRequest.getOption());
        this.startDate = todoRequest.getStartDate();
        this.dueDate = todoRequest.getDueDate();
        this.dayUntilDue = ChronoUnit.DAYS.between(todoRequest.getStartDate(), todoRequest.getDueDate());
    }
}
