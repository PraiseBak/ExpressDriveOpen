package com.pb.expressdrive.Service;

import com.pb.expressdrive.Domain.Dto.BoardDto;
import com.pb.expressdrive.Domain.Entity.Board;
import com.pb.expressdrive.Domain.Entity.Comment;
import com.pb.expressdrive.Domain.Entity.Community;
import com.pb.expressdrive.Domain.Entity.User;
import com.pb.expressdrive.Domain.Repository.BoardRepository;
import com.pb.expressdrive.Domain.Repository.CommunityRepository;
import com.pb.expressdrive.Helper.CommunityURL;
import com.pb.expressdrive.Helper.Error.CustomException;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Helper.InterestEnum;
import com.pb.expressdrive.Util.BoardValidCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final BoardRepository boardRepository;
    private final PageService pageService;
    private final CommentService commentService;
    private final BoardValidCheck boardValidCheck = new BoardValidCheck();

    public Community getCommunityByURL(String community) {
        return communityRepository.findByUrl(community);
    }

    public void initCommunity() {
        CommunityURL[] communityUrlList = CommunityURL.values();

        if(communityRepository.count() == 0){
            for (InterestEnum i : InterestEnum.values()){
                Community community = Community.builder()
                        .name(i.getStr())
                        .url(communityUrlList[i.getCode()].getUrl())
                        .build();
                communityRepository.save(community);
            }
        }
    }

    public List<Community> getCommunityList(){
        return new ArrayList<>(communityRepository.findAll());
    }

    public List<BoardDto> getBoardList(Community community, Integer page) {
        Pageable pageable = pageService.getPageable(page);
        List<BoardDto> boardDtoList = new ArrayList<>();
        for(Board board : boardRepository.findBoardsByCommunityOrderByIdDesc(community,pageable)){
            boardDtoList.add(board.convertEntityToDto());
        }
        return boardDtoList;
    }

    public Long getBoardSize(Community community) {
        return boardRepository.countAllByCommunity(community);
    }

    public void addBoard(Board board, User user,Community community) {
        if(boardValidCheck.isValidBoard(board)){
            board.setUser(user);
            board.setCommunity(community);
        }
        boardRepository.save(board);
    }

    public BoardDto getBoardById(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(
                        ()->new CustomException(ErrorInfo.CANNOT_FIND_DATA))
                .convertEntityToDto();
    }

    public void deleteBoard(Long boardId, Authentication authentication) {
        Board board = boardRepository.findById(boardId).orElseThrow(
                ()->new CustomException(ErrorInfo.CANNOT_FIND_DATA));

        //글쓴이와 동일한 유저인지 확인
        if(authentication.getName().equals(board.getUser().getUsername())){
            boardRepository.delete(board);
        }

    }

    @Transactional
    public void modifyContent(String content, Long boardId, Authentication authentication) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new CustomException(ErrorInfo.CANNOT_FIND_DATA));
        if(authentication.getName().equals(board.getUser().getUsername())){
            board.setContent(content);
        }else {
            throw new CustomException(ErrorInfo.USER_AUTH_DENIED);
        }

   }

    public void setBoardPaging(Model model, String communityURL,Integer page) {
        Community curCommunity = getCommunityByURL(communityURL);
        List<BoardDto> boardList = getBoardList(curCommunity,page);
        Long traceSize = getBoardSize(curCommunity);
        List<Integer> pageBtnList = pageService.getPageBtnList(page, traceSize);
        model.addAttribute("community",curCommunity);
        model.addAttribute("boardList",boardList);
        model.addAttribute("pageBtnList",pageBtnList);

    }

    public void setBoard(Long boardId, String communityURL, Model model) {
        Community curCommunity = getCommunityByURL(communityURL);
        List<Comment> commentList = commentService.getCommentList(boardId);
        BoardDto boardDto = getBoardById(boardId);

        model.addAttribute("community",curCommunity);
        model.addAttribute("board",boardDto);
        model.addAttribute(commentList);
    }
}
