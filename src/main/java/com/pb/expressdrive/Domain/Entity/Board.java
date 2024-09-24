package com.pb.expressdrive.Domain.Entity;

import com.pb.expressdrive.Domain.Dto.BoardDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@ToString
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
public class Board extends BaseTimeEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="제목을 작성해주세요")
    @Size(min = 2,max = 40)
    @Column(length = 80,nullable = false)
    private String title;

    @NotBlank(message="내용을 작성해주세요")
    @Size(min = 2,max = 4000)
    @Column(columnDefinition="TEXT",nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;

    @ColumnDefault("0")
    private int likeCount;

    @ColumnDefault("0")
    private int dislikeCount;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true,mappedBy = "board")
    private List<Comment> commentList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true,mappedBy ="board")
    private List<ReactionInfo> reactionInfoList;


    public BoardDto convertEntityToDto(){
        return BoardDto.builder()
                .id(getId())
                .content(getContent())
                .dislike(getDislikeCount())
                .likeCount(getLikeCount())
                .title(getTitle())
                .username(getUser().getUsername())
                .createdDate(getCreatedDate())
                .modifiedDate(getModifiedDate())
                .commentList(getCommentList())
                .build();
    }

    public void likeCount() {
        this.likeCount++;
    }

    public void dislikeCount() {
        this.dislikeCount++;
    }
}
