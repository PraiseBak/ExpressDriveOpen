package com.pb.expressdrive.Service;


import com.pb.expressdrive.Domain.Entity.Board;
import com.pb.expressdrive.Domain.Entity.Comment;
import com.pb.expressdrive.Domain.Entity.User;
import com.pb.expressdrive.Domain.Repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final UserService userService;
    private final BoardService boardService;
    private final CommentRepository commentRepository;
    private final AuthService authService;


    public void add(String text, Authentication authentication, String pageOwnerUsername) {
        User user = userService.getUserByAuth(authentication);

        Comment comment = Comment.builder()
                .text(text)
                .pageOwnerUsername(pageOwnerUsername)
                .writeUsername(user.getUsername())
                .writeUserProfileImgSrc(user.getUserProfileImgSrc())
                .build();
        commentRepository.save(comment);
    }

    public void delete(Long id, Authentication authentication) {
        String username = authService.getUsername(authentication);
        commentRepository.findById(id)
                .filter((o) -> o.getWriteUsername().equals(username))
                .ifPresent(commentRepository::delete);
    }

    @Transactional
    public void update(Long id, String text, Authentication authentication) {
        String username = authService.getUsername(authentication);
        commentRepository
                .findById(id)
                .filter((o) -> o.getWriteUsername().equals(username))
                .ifPresent((o)->o.setText(text));
    }

    public List<Comment> getCommentList(String pageOwnerUsername){
        return commentRepository.findAllByPageOwnerUsername(pageOwnerUsername);
    }


    //커뮤니티의 댓글 추가
    @Transactional
    public void add(String text, Authentication authentication, Long boardId) {
        User user = userService.getUserByAuth(authentication);
        Board board = boardService.getBoardById(boardId);
        System.out.println(board.getCommentList().size());

        Comment comment = Comment.builder()
                .text(text)
                .writeUsername(user.getUsername())
                .writeUserProfileImgSrc(user.getUserProfileImgSrc())
                .board(board)
                .build();

        board.getCommentList().add(comment);
        commentRepository.save(comment);

    }

    public List<Comment> getCommentList(Long boardId) {
        return commentRepository.findAllByBoardId(boardId);
    }
}
