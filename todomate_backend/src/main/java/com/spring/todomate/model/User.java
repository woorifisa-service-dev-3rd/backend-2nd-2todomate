package com.spring.todomate.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED) @AllArgsConstructor
@SuperBuilder

@AttributeOverride(name = "id", column = @Column(name = "user_id"))
@Table(name = "users")
@Entity
public class User extends BaseEntity{

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_password")
    private String password;
}
