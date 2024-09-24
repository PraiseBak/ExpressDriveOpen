package com.pb.expressdrive.Helper.Error;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorInfo {
    //JS로 제대로된 동작을 명시했으나 예상치 못한 에러 발생한 경우
    SIGNUP_ERROR(101, "회원가입에 실패하였습니다"),
    VALID_CHECK_ERROR(301, "유효하지 않은 입력입니다"),
    USERNAME_NOT_FOUND(201, "일치하지 않는 유저정보입니다"),
    COMMON_ERROR(500, "예기치 못한 에러입니다"),
    CANNOT_FIND_DATA(501, "데이터를 찾지 못하였습니다"),
    USER_AUTH_DENIED(202, "해당 요청의 권한이 없습니다"),
    IMAGE_VALID_ERROR(302,"유효하지 않은 이미지입니다"),
    SIZE_ERROR(303,"입력의 크기를 초과하였습니다"),
    ADDR_ERROR(305,"이미 추천하였습니다"),;


    private int code;
    private String message;


}
