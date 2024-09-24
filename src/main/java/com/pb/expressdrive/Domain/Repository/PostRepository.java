package com.pb.expressdrive.Domain.Repository;

import com.pb.expressdrive.Domain.Entity.Post;
import com.pb.expressdrive.Domain.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long>
{
    Page<Post> findAll(Pageable pageable);

    List<Post> findAllByCreatedDateBetweenAndUserUsername(LocalDateTime startDatetime, LocalDateTime endDatetime, String username);
}

