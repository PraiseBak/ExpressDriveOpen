package com.pb.expressdrive.Domain.Repository;

import com.pb.expressdrive.Domain.Entity.ReactionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReactionInfoRepository extends JpaRepository<ReactionInfo,Long> {

}
