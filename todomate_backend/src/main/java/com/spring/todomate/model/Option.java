package com.spring.todomate.model;

public enum Option {
    TO_DO("To Do"),
    ON_PROGRESS("On Progress"),
    DONE("Done");

    private final String option;

    Option(String option) {
        this.option = option;
    }

    public String option() {
        return option;
    }
}
