package com.pb.expressdrive.Domain.Entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@DynamicInsert
@Setter
public class Following
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 60,nullable = false)
    private String followedUsername;

    @Column(length = 60,nullable = false)
    private String followingUsername;

    @Column(length = 1)
    @ColumnDefault("0")
    private Boolean isRead;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @OneToOne(cascade = CascadeType.ALL)
    private Todo recentTodo;

    @OneToOne(cascade = CascadeType.ALL)
    private Post recentPost;
}
