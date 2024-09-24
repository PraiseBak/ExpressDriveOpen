package com.pb.expressdrive.Domain.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pb.expressdrive.Domain.Dto.TraceHeatmapDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@DynamicInsert
@ToString
@Setter
@Getter
public class Todo extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(length = 1)
    @ColumnDefault("0")
    private Boolean checked;

    @Column(length = 1)
    @ColumnDefault("0")
    private Boolean deleted;

    @Column(length = 1)
    @ColumnDefault("0")
    private Boolean hide;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date until;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    User user;

    @Column(length = 100)
    @ColumnDefault("''")
    private String cause;

    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "todo")
    private List<Interest> interests = new ArrayList<>();

    private String imgSrc;

    private LocalDateTime objDate;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "todo")
    private List<TodoElem> todoElemList = new ArrayList<>();

    public void update(Todo writeObj, List<Interest> interestList, List<String> todoElemContentList) {
        this.checked = writeObj.checked != null && writeObj.checked;
        this.content = writeObj.content;
        this.until = writeObj.until;
        this.interests.clear();
        if (interestList == null) return;
        this.interests.addAll(interestList);
        int idx = 0;

        for (String todoElemContent : todoElemContentList) {
            if(idx == this.todoElemList.size()){
                //이 시점부터는 idx가 필요없음
                TodoElem newTodoElem = TodoElem.builder()
                        .todoElemContent(todoElemContent)
                        .todo(this)
                        .build();
                this.getTodoElemList().add(newTodoElem);
            }else{
                todoElemList.get(idx++).setTodoElemContent(todoElemContent);
            }
        }

    }

    public TraceHeatmapDto convertHeatmapDto() {
        return new TraceHeatmapDto("TODO : " + getContent(), getCreatedDate());
    }
}
