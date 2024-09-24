package com.pb.expressdrive.Domain.Dto;

import com.pb.expressdrive.Domain.Entity.Interest;
import com.pb.expressdrive.Domain.Entity.TodoElem;
import com.pb.expressdrive.Domain.Entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class TodoDto {
    private Long id;

    private String content;

    private Boolean checked;

    private Boolean deleted;

    private Boolean hide;

    private Date until;

    private User user;

    private String cause;

    private List<Interest> interests = new ArrayList<>();

    private String imgSrc;

    private LocalDateTime objDate;

    private String leftDate;

    private List<TodoElem> todoElemList;
}
