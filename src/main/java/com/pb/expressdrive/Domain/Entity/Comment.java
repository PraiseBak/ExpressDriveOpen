package com.pb.expressdrive.Domain.Entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@DynamicInsert
@ToString
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseTimeEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    @NotBlank(message = "글 내용을 2글자 이상 1000글자 미만으로 작성해주세요")
    @Size(min = 2,max=1000)
    private String text;

    //유저페이지의 댓글로써 필요한 필드
    private String pageOwnerUsername;

    private String writeUsername;

    private String writeUserProfileImgSrc;

    @ManyToOne
    //커뮤니티 댓글로써 사용될 때 필요한 필드
    private Board board;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    @JsonIgnore
//    User user;

    //대댓글 기능 염두
    //비밀글 기능 염두

}
