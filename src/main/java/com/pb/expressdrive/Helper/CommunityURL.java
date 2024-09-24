package com.pb.expressdrive.Helper;

import lombok.AllArgsConstructor;
import lombok.Getter;



//초기 서버상태에서의 기본 url enum (어드민 권한을 가진 사용자가 동적으로 추가할수도 있음)
@AllArgsConstructor
@Getter
public enum CommunityURL {
    ENTERTAINMENT("entertain"),
    HEALTH("health"),
    MONK("monkmode"),
    PROGRAMMING("programming"),
    STUDY("study"),
    SELF_DEVELOP("selfdev"),
    MUSIC("music"),
    SPORT("sport");
    String url;
}
