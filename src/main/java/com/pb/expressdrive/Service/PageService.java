package com.pb.expressdrive.Service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class PageService {
    private static final int PAGE_UNIT = 30;

    public Pageable getPageable(int startPage){
        return PageRequest.of(startPage-1,PAGE_UNIT, Sort.by("createdDate").descending());
    }

    public List<Integer> getPageBtnList(Integer page, Long traceSize) {
        List<Integer> pageBtnList = new ArrayList<>();
        int pageNum = Math.max(page - 4, 1);
        int minPageNum = pageNum;

        long maxPageNum = ((traceSize-1) / PAGE_UNIT) + 1;
        while (pageBtnList.size() != 10 && pageNum <= maxPageNum){
            pageBtnList.add(pageNum++);
        }
        while (minPageNum != 1  && pageBtnList.size() != 10) pageBtnList.add(0,--minPageNum);
        return pageBtnList;
    }
}
