package com.pb.expressdrive.Domain.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

public class LikeInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotNull(message = "게시물 정보가 없습니다")
    Long boardId;

    String ip;

    boolean isLike;
}
