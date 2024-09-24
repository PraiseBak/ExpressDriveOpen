package com.pb.expressdrive.Domain.Repository;

import com.pb.expressdrive.Domain.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>
{
    Optional<User> findByUsernameOrEmail(String username,String email);
    Optional<User> findByUsername(String username);
    Page<User> findAll(Pageable pageable);

    Page<User> findAllByUsernameContaining(Pageable pageable,String requestUsername);
    List<User> findAllByPostCountGreaterThanOrTodoCountGreaterThan(int num,int num2);
//    List<User> findAllByPostCountGreaterThanAndInterestsInterestIdx(int num, int interestsInterestIdx);
//    List<User> findAllByTodoCountGreaterThan(int num);
}

