package com.pb.expressdrive.APIController.User;


import com.pb.expressdrive.Service.AuthService;
import com.pb.expressdrive.Service.FollowService;
import com.pb.expressdrive.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/followInfo")
@RequiredArgsConstructor
public class FollowInfoAPIController
{
    private final UserService userService;
    private final FollowService followService;

    @GetMapping("/")
    List<String> getRecentContent(Authentication authentication){
        return followService.getRecentWrite(userService.getUserByAuth(authentication));
    }

}
