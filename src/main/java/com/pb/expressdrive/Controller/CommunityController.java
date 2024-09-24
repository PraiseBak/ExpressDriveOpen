package com.pb.expressdrive.Controller;


import com.pb.expressdrive.Domain.Dto.BoardDto;
import com.pb.expressdrive.Domain.Entity.Board;
import com.pb.expressdrive.Domain.Entity.Community;
import com.pb.expressdrive.Service.CommentService;
import com.pb.expressdrive.Service.CommunityService;
import com.pb.expressdrive.Service.PageService;
import com.pb.expressdrive.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    private final UserService userService;

    private final PageService pageService;
    private final CommentService commentService;


    @GetMapping("/{communityURL}")
    public String boardList( @PathVariable String communityURL,
                        @RequestParam(defaultValue = "1") Integer page,
                        Model model){

        communityService.setBoardPaging(model,communityURL,page);
        return "community/boardList";
    }


    @GetMapping("/{communityURL}/{boardId}")
    public String board(@PathVariable String communityURL,
                        @PathVariable Long boardId,
                        @RequestParam(defaultValue = "1") Integer page,
                        Model model){

        communityService.setBoardPaging(model,communityURL,page);
        communityService.setBoard(boardId,communityURL, model);
        return "community/boardPage";
    }

    @DeleteMapping("/{communityURL}/{boardId}/delete")
    public String delete(@PathVariable String communityURL,@PathVariable Long boardId, Model model,Authentication authentication){
        Community curCommunity = communityService.getCommunityByURL(communityURL);
        communityService.deleteBoard(boardId,authentication);
        model.addAttribute("community",curCommunity);
        return "community/boardList";
    }

    @GetMapping("/{communityURL}/{boardId}/modify")
    public String updatePage(@PathVariable String communityURL,@PathVariable Long boardId, Model model){
        Community curCommunity = communityService.getCommunityByURL(communityURL);
        BoardDto boardDto = communityService.getBoardById(boardId);
        model.addAttribute("board",boardDto);
        model.addAttribute("community",curCommunity);
        return "community/modify";
    }


    @PatchMapping("/{communityURL}/{boardId}/modify")
    public String update(@PathVariable String communityURL, @PathVariable Long boardId, Model model, @Valid Board board, Authentication authentication){
        Community curCommunity = communityService.getCommunityByURL(communityURL);
        BoardDto boardDto = communityService.getBoardById(boardId);
        communityService.modifyContent(board.getContent(),boardId, authentication);

        model.addAttribute("board",boardDto);
        model.addAttribute("community",curCommunity);
        return "community/boardList";
    }



    @GetMapping("/{communityURL}/write")
    public String write(@PathVariable String communityURL, Model model){
        Community curCommunity = communityService.getCommunityByURL(communityURL);
        model.addAttribute("community",curCommunity);
        return "community/write";
    }


    @PostMapping("/{communityURL}/write")
    public String write(@PathVariable String communityURL, Authentication authentication,Model model, @Valid Board board){
        try{
            Community curCommunity = communityService.getCommunityByURL(communityURL);
            communityService.addBoard(board,userService.getUserByAuth(authentication),curCommunity);
            model.addAttribute("community",curCommunity);
            return "redirect:/community/" + communityURL;
        }catch (Exception e){
            return "/community/write";
        }

    }






}
