package com.pb.expressdrive.Domain.Entity;

import com.pb.expressdrive.Domain.Dto.TraceHeatmapDto;
import lombok.*;

import javax.persistence.*;

@Entity
@ToString
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post extends BaseTimeEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 80,nullable = false)
    private String title;

    @Column(columnDefinition="TEXT",nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    private String imgSrc;

    public void update(Post writeObj)
    {
        this.title = writeObj.title;
        this.content = writeObj.content;
    }

    public TraceHeatmapDto convertHeatmapDto(){

        return new TraceHeatmapDto("포스트 : " + getTitle(),getCreatedDate());
    }
}
