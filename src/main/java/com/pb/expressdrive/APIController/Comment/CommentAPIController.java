package com.pb.expressdrive.APIController.Comment;


import com.pb.expressdrive.Domain.Dto.ResponseDto;
import com.pb.expressdrive.Domain.Entity.Comment;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/API/comment")
@RequiredArgsConstructor
public class CommentAPIController {

    private final CommentService commentService;

    @PostMapping("/")
    public ResponseDto add(@Valid Comment comment, Long boardId,Authentication authentication){
        try{
            if(boardId == null){
                this.commentService.add(comment.getText(),authentication, comment.getPageOwnerUsername());
            }else{
                this.commentService.add(comment.getText(),authentication, boardId);
            }
        }catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseDto(500, ErrorInfo.COMMON_ERROR.getMessage());
        }
        return new ResponseDto(200, "코멘트 추가 완료");
    }

    @DeleteMapping("/")
    public ResponseDto delete(Long id,Authentication authentication){
        try{
            this.commentService.delete(id,authentication);
        }catch (RuntimeException e){
            return new ResponseDto(500, ErrorInfo.COMMON_ERROR.getMessage());
        }
        return new ResponseDto(200, "코멘트 추가 완료");
    }


    @PatchMapping("/")
    public ResponseDto update(Long id,String text,Authentication authentication){
        try{
            this.commentService.update(id,text,authentication);
        }catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseDto(500, ErrorInfo.COMMON_ERROR.getMessage());
        }
        return new ResponseDto(200, "코멘트 추가 완료");
    }



}
