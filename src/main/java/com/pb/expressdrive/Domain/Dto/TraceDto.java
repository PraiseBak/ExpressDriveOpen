package com.pb.expressdrive.Domain.Dto;

import com.pb.expressdrive.Domain.Entity.Post;
import com.pb.expressdrive.Domain.Entity.Todo;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class TraceDto implements Comparable<TraceDto>{
    Todo todo;
    Post post;

    String time;

    //날짜 변환

    private void convertTime(Todo todo, Post post){
        LocalDateTime curTime = todo != null ? todo.getCreatedDate() : post.getCreatedDate();
        LocalDateTime today = LocalDateTime.now();
        DateTimeFormatter onlyDate = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        String year = "";
        String month = curTime.getMonthValue() + "";
        String day = curTime.getDayOfMonth() + "";

        //같은 날
        if(today.getDayOfMonth() == curTime.getDayOfMonth()){
            this.time = curTime.format(DateTimeFormatter.ofPattern("HH:mm"));
        }else{
            if(today.getYear() != curTime.getYear()){
                year = curTime.getYear() + ".";
            }
            month = month.length() == 1 ? "0" + month : month;
            day = day.length() == 1 ? "0" + day : day;
            this.time = String.format("%s%s.%s",year,month,day);
        }
    }
    public TraceDto(Todo todo, Post post) {
        convertTime(todo,post);
        this.todo = todo;
        this.post = post;
    }

    @Override
    public int compareTo(TraceDto o) {
        boolean isTodoExist = todo != null;
        boolean isObjTodoExist = o.todo != null;

        LocalDateTime curTime = isTodoExist ? todo.getCreatedDate() : post.getCreatedDate();
        LocalDateTime objTime = isObjTodoExist ? o.todo.getCreatedDate() : o.post.getCreatedDate();
        return curTime.compareTo(objTime);
    }
}
