package com.pb.expressdrive.Controller;

import com.pb.expressdrive.Domain.Dto.TodoDto;
import com.pb.expressdrive.Domain.Dto.TraceDto;
import com.pb.expressdrive.Domain.Entity.Comment;
import com.pb.expressdrive.Domain.Entity.User;
import com.pb.expressdrive.Helper.InterestEnum;
import com.pb.expressdrive.Service.*;
import com.pb.expressdrive.Util.TraceValidCheck;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/user/trace")
public class TraceController
{
    private ImgService imgService;
    private AuthService authService;
    private UserService userService;
    private TraceService traceService;
    private TraceValidCheck traceValidCheck;
    private InterestService interestService;

    private CommentService commentService;
    private PageService pageService;


    @GetMapping(value = {"","{username}"})
    public String userTrace(Authentication auth, Model model,@PathVariable(required = false) String username)
    {
        User pageOwnerUser;
        if(username == null) username = authService.getUsername(auth);
        else userService.visit(username);
        pageOwnerUser = userService.getUserByUsername(username);
        User visitUser = userService.getUserByAuth(auth);

        List<User> recommendedUsers = interestService.getRecommendedUser(visitUser);
        List<TodoDto> todoList = traceService.getTodoDtoList(pageOwnerUser.getTodos());
        List<Comment> commentList = commentService.getCommentList(username);

        todoList.sort(new Comparator<TodoDto>() {
            @Override
            public int compare(TodoDto t1, TodoDto t2) {
                //둘다 checked가 아님
                if(Boolean.compare(t2.getChecked(),t1.getChecked()) == 0 && !t2.getChecked()){
                    return Boolean.compare(t1.getDeleted(),t2.getDeleted());
                }
                //checked 우선
                return Boolean.compare(t2.getChecked(),t1.getChecked());
            }
        });

        InterestEnum[] interestEnumList = InterestEnum.values();

        model.addAttribute("checkedTodoCount",traceService.getChckedTodoCount(todoList));
        model.addAttribute(interestEnumList);
        model.addAttribute("commentList",commentList);
        model.addAttribute("todos",todoList);
        model.addAttribute("posts",pageOwnerUser.getPosts());
        model.addAttribute("owner",pageOwnerUser.getUsername());
        model.addAttribute("recommendedUsers",recommendedUsers);
        model.addAttribute("isFollowedUser",visitUser.getFollowings().stream().anyMatch(o -> o.getFollowedUsername().equals(pageOwnerUser.getUsername())));
        model.addAttribute("traceHeatmapList",traceService.getTodoHeatmapInfo(username));
        model.addAttribute("info",pageOwnerUser.getInfo());
        model.addAttribute("userProfileImgSrc",pageOwnerUser.getUserProfileImgSrc());
        model.addAttribute("followedCount",pageOwnerUser.getFollowedCount());
        model.addAttribute("interestList", interestService.getInterestByUserId(pageOwnerUser));
        model.addAttribute("linkA",pageOwnerUser.getLinkA());
        model.addAttribute("linkB",pageOwnerUser.getLinkB());

        return "user/trace/trace";
    }

    @GetMapping("/write")
    public String write(Model model)
    {
        InterestEnum[] interestEnumList = InterestEnum.values();
        model.addAttribute(interestEnumList);
        return "user/trace/write";
    }

    @GetMapping("/update")
    public <T> String writeSubmit(@RequestParam int mode,@RequestParam Long id,Authentication authentication,Model model)
    {
        String[] nameList = {"todo","post"};
        Object trace = traceService.getSameUsersTraceOrThrow(authentication,mode,id);
        model.addAttribute(nameList[mode],trace);
        InterestEnum[] interestEnumList = InterestEnum.values();
        model.addAttribute(interestEnumList);
        return "user/trace/write";
    }

    @GetMapping("/dashboard")
    public <T> String dashBoard(Authentication auth,Model model,@RequestParam(name="isSuccess",required = false,defaultValue = "on") String isSuccess)
    {
        String username = authService.getUsername(auth);
        User pageOwnerUser = userService.getUserByUsername(username);
        HashMap<String,Integer> countedInterestMap;
        HashMap<String,Integer> percentInterestMap;
        if(isSuccess.equals("on")){
            countedInterestMap = interestService.getCountedTodoInterestMap(traceService.getSucceedTodoList(username));
            percentInterestMap = interestService.getPercentTodoInterestMap(traceService.getTodoList(username), 1);
        }else{
            countedInterestMap = interestService.getCountedTodoInterestMap(traceService.getFailTodoList(username));
            percentInterestMap = interestService.getPercentTodoInterestMap(traceService.getTodoList(username), 0);
        }

        model.addAttribute("isSuccess",isSuccess.equals("on"));
        model.addAttribute("objTodoList", isSuccess.equals("on") ? traceService.getSucceedTodoList(username) : traceService.getFailTodoList(username));
        model.addAttribute("percentInterestMap",percentInterestMap);
        model.addAttribute("countedInterestMap",countedInterestMap);
        model.addAttribute("profileImgSrc",pageOwnerUser.getUserProfileImgSrc());
        model.addAttribute("traceHeatmapList",traceService.getTodoHeatmapInfo(username));
        return "user/trace/dashboard";
    }

    @GetMapping("/list")
    public String list(@RequestParam(required = false,defaultValue = "1") Integer page,
                       Model model,
                       @RequestParam(required = false,defaultValue = "0") Integer mode)
    {
        boolean isTodo = mode == 0;
        List<TraceDto> traceDtoList = traceService.getAllTraceList(page,isTodo);
        Long traceSize = traceService.getTraceSize(isTodo);
        List<Integer> pageBtnList = pageService.getPageBtnList(page, traceSize);
        model.addAttribute("traceDtoList",traceDtoList);
        model.addAttribute("pageBtnList",pageBtnList);
        //어떤 모양으로?
        // 유형 || 콘텐트 || 유저?
        model.addAttribute("mode",mode);
        return "user/trace/traceList";
    }


//
//    //UPDATE
//    @PatchMapping("/write/{mode}/{id}")
//    public String write(@PathVariable Boolean mode, @PathVariable Long id)
//    {
//        //is same user check
//        //get data (dto)
//        //add to model
//        return "redirect: /";
//
//    }

}
