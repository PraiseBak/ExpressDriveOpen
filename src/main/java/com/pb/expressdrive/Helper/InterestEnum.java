package com.pb.expressdrive.Helper;

import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum InterestEnum
{

    ENTERTAINMENT(0,"엔터테이먼트"),
    HEALTH(1,"헬스"),
    MONK(2,"금욕"),
    PROGRAMMING(3,"프로그래밍"),
    STUDY(4,"스터디"),
    SELF_DEVELOP(5,"자기계발"),
    MUSIC(6,"음악"),
    SPORT(7,"스포츠");

    int code;
    String str;
}
