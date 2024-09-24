package com.pb.expressdrive.Domain.Repository;

import com.pb.expressdrive.Domain.Entity.Board;
import com.pb.expressdrive.Domain.Entity.Community;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findBoardsByCommunityOrderByIdDesc(Community community, Pageable pageable);
    Long countAllByCommunity(Community community);

    Board findByCommunityAndId(Community community, Long id);
    Board findByCommunity(Community community);

}
