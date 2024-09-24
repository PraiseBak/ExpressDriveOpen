package com.pb.expressdrive.Controller;


import com.pb.expressdrive.Domain.Dto.UserSearchDto;
import com.pb.expressdrive.Domain.Entity.User;
import com.pb.expressdrive.Service.CommunityService;
import com.pb.expressdrive.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final CommunityService communityService;

    private final UserService userService;

    @GetMapping("/initCommunity")
    public String initCommunity(){
        communityService.initCommunity();
        return "redirect:/admin/dashboard";
    }

    @GetMapping("/dashboard")
    public String admin(){
        return "admin/dashboard";
    }

    @GetMapping("/addAdmin")
    public String addAdmin(Model model, @RequestParam(required = false,defaultValue = "1") int page){
        List<String> usernameList = userService.getUsernameList(1, "");
        List<UserSearchDto> userSearchDtoList = new ArrayList<>();
        for(String username : usernameList){
            User user = userService.getUserByUsername(username);
            UserSearchDto userSearchDto = new UserSearchDto(user.getUserProfileImgSrc(),username,user.getEmail(),user.getPostCount() + user.getTodoCount());
            userSearchDtoList.add(userSearchDto);
        }
        model.addAttribute("userList",userSearchDtoList);
        return "admin/addAdmin";
    }

    @PostMapping("/addAdmin")
    public String addAdminPost(){
        return "admin/dashboard";
    }


}
