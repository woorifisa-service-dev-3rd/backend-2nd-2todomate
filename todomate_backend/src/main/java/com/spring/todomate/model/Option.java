package com.spring.todomate.model;

public enum Option {
    TODO("TODO"),
    PROGRESS("PROGRESS"),
    DONE("DONE");

    private final String option;

    Option(String option) {
        this.option = option;
    }

    @Override
    public String toString() {
        return option;
    }
}
