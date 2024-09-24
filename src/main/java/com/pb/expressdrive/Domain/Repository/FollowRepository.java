package com.pb.expressdrive.Domain.Repository;

import com.pb.expressdrive.Domain.Entity.Following;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Following, Long>
{
    List<Following> findAllByFollowedUsername(String followedUsername);
}

