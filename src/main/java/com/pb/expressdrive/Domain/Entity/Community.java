package com.pb.expressdrive.Domain.Entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@ToString
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Community extends BaseTimeEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message="존재하지 않는 커뮤니티입니다")
    @Column(columnDefinition="TEXT",nullable = false)
    private String name;

    @NotNull(message="url이 존재하지 않습니다")
    @Column(length = 40,nullable = false)
    private String url;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Board> boardList;

//    @Formula("(SELECT count(1) FROM board b WHERE b.title=name)")
//    private Long boardCount;

}
