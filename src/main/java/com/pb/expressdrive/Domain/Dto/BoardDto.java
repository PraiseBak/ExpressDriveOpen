package com.pb.expressdrive.Domain.Dto;

import com.pb.expressdrive.Domain.Entity.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Builder
public class BoardDto {
    private Long id;
    private String title;
    private String content;
    private String username;
    private String community;
    private int likeCount;
    private int dislike;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private List<Comment> commentList;
}
