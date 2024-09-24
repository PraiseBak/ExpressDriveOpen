package com.pb.expressdrive.Domain.Entity;

import lombok.*;
import org.hibernate.annotations.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@ToString
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 60, nullable = false)
    private String username;

    @Column(length = 256, nullable = false)
    private String password;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 100)
    @ColumnDefault("''")
    private String info;

    private String linkA;

    private String linkB;

    @ColumnDefault("'default-profile.jpg'")
    private String userProfileImgSrc;

    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "user")
    private List<Following> followings = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "user")
    private List<Post> posts = new ArrayList<>();

    @Formula("(SELECT count(1) FROM post p WHERE p.user_id = id)")
    private int postCount;

    @Formula("(SELECT count(1) FROM todo t WHERE t.user_id = id)")
    private int todoCount;

    @Formula("(SELECT count(1) FROM following f WHERE f.followed_username = username)")
    private int followedCount;


    //mapped by - 대상이되는 변수명 (Todo의 user)
    @ToString.Exclude
    @LazyCollection(LazyCollectionOption.EXTRA)
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "user")
    private List<Todo> todos = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "user")
    private List<Interest> interests = new ArrayList<>();

    @ColumnDefault("0")
    @Builder.Default
    private Long visitNum = 0L;

    //할 추가
    @NotNull
    private Role role = Role.USER;

    private LocalDateTime blockUntil;

    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "user")
    private List<Board> boards = new ArrayList<>();

}
