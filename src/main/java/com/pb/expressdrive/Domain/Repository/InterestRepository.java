package com.pb.expressdrive.Domain.Repository;

import com.pb.expressdrive.Domain.Entity.Interest;
import com.pb.expressdrive.Domain.Entity.Todo;
import com.pb.expressdrive.Domain.Entity.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public interface InterestRepository extends JpaRepository<Interest, Long>
{
    List<Interest> findAllByUserId(Long userID);
}

