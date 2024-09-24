package com.pb.expressdrive.Service;

import org.springframework.security.core.Authentication;

import java.util.List;

public interface TraceServiceInterface
{
    //제네릭사용
    <T> void write(T writeObj, Authentication authentication, List<Integer> interestIdxList, String imgSrc, List<String> todoElemContentList);

    <T> void delete(Integer mode, Long deleteObjId, Authentication authentication,String cause);
    <T> void update(T writeObj, Long updateId, Authentication authentication, List<Integer> interests, List<String> todoElemContentList, String imgSrc);
}
