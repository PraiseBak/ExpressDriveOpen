package com.pb.expressdrive.Service;


import com.pb.expressdrive.Domain.Entity.Board;
import com.pb.expressdrive.Domain.Entity.ReactionInfo;
import com.pb.expressdrive.Domain.Repository.BoardRepository;
import com.pb.expressdrive.Domain.Repository.ReactionInfoRepository;
import com.pb.expressdrive.Helper.Error.CustomException;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Helper.Error.InternalServerError;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final ReactionInfoRepository reactionInfoRepository;

    public Board getBoardById(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new InternalServerError(ErrorInfo.COMMON_ERROR.getCode(),ErrorInfo.CANNOT_FIND_DATA.getMessage()));
    }

    @Transactional
    public boolean reaction(Long boardId, Boolean mode, Authentication authentication,String userAddr) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new InternalServerError(ErrorInfo.CANNOT_FIND_DATA.getCode(),ErrorInfo.CANNOT_FIND_DATA.getMessage()));
        //이미 추천했는지
        userAddr = userAddr.substring(0,userAddr.length()-3) + "***";
        String modifiedAddr = userAddr;
        if(board.getReactionInfoList()
                .stream()
                .filter((o) -> o.getMode() == mode && o.getIp().equals(modifiedAddr))
                .findFirst().isPresent()){
            throw new CustomException(ErrorInfo.ADDR_ERROR);
        }


        if(mode){
            board.likeCount();
        }else{
            board.dislikeCount();
        }

        board.getReactionInfoList().add(reactionInfoRepository.save(ReactionInfo.builder()
                .ip(modifiedAddr)
                .board(board)
                .mode(mode)
                .build()));
        return true;
    }
}
