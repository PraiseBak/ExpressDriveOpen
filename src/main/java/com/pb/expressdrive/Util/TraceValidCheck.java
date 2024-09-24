package com.pb.expressdrive.Util;

import com.pb.expressdrive.Domain.Entity.Post;
import com.pb.expressdrive.Domain.Entity.Todo;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TraceValidCheck
{
    private static final int CONTENT_MAX = 1000;
    private static final int CONTENT_MIN = 2;
    private static final int TITLE_MAX = 40;
    private static final int TITLE_MIN = 2;

    private boolean isValidUntil(Date until){
        if(until == null) return true;
        String pattern = "^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$";
        //yyyy-mm-dd날짜 양식에 맞는지 확인
        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd");
        String formattedUntil = date.format(until);
        return formattedUntil.matches(pattern);
    }

    public boolean isValidTodo(Todo todo)
    {
        int contentLen = todo.getContent().length();
        return contentLen >= CONTENT_MIN && contentLen <= CONTENT_MAX && isValidUntil(todo.getUntil());
    }

    public boolean isValidPost(Post post)
    {
        int titleLen = post.getTitle().length();
        int contentLen = post.getContent().length();
        if(titleLen < TITLE_MIN || titleLen > TITLE_MAX) return false;
        return contentLen >= CONTENT_MIN && contentLen <= CONTENT_MAX;
    }

    public <T> boolean isValidTrace(T checkObj)
    {
        boolean result = false;
        if(checkObj instanceof Post) result = isValidPost((Post) checkObj);
        else result = isValidTodo((Todo) checkObj);
        return result;
    }

}
