package com.pb.expressdrive.Domain.Repository;

import com.pb.expressdrive.Domain.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long>
{
    List<Comment> findAllByPageOwnerUsername(String pageOwnerUsername);
    List<Comment> findAllByBoardId(Long boardId);


}

