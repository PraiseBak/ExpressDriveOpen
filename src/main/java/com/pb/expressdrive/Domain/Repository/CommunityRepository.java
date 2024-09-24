package com.pb.expressdrive.Domain.Repository;

import com.pb.expressdrive.Domain.Entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    Community findByUrl(String url);

}