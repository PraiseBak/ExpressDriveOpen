package com.pb.expressdrive.Domain.Repository;

import com.pb.expressdrive.Domain.Entity.Todo;
import com.pb.expressdrive.Domain.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long>
{
    Page<Todo> findAll(Pageable pageable);

    List<Todo> findAllByCreatedDateBetweenAndUserUsername(LocalDateTime start,LocalDateTime end, String username);
    List<Todo> findAllByUserUsernameAndCheckedOrderByObjDateDesc(String username, Boolean checked);

    List<Todo> findAllByUserUsername(String username);


}

