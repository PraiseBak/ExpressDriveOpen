package com.pb.expressdrive.APIController.Board;


import com.pb.expressdrive.Helper.Error.ErrorResponseEntity;
import com.pb.expressdrive.Service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

//RestController
@RestController
@RequestMapping("/API/board")
@RequiredArgsConstructor
public class BoardAPIController {
    private final BoardService boardService;

    @PatchMapping(value = "/")
    public ResponseEntity<ErrorResponseEntity> reactionBoard(Long boardId, Boolean mode, Authentication authentication, HttpServletRequest req){
        boardService.reaction(boardId,mode,authentication,req.getRemoteAddr());
        return ErrorResponseEntity.toResponseEntity(200,"");
    }

}
