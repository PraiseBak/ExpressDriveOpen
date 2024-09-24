package com.pb.expressdrive.APIController.User;

import com.pb.expressdrive.Domain.Entity.User;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Helper.Error.InternalServerError;
import com.pb.expressdrive.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/API/user")
@AllArgsConstructor
public class UserAPIController
{
    private UserService userService;

    @GetMapping("/existsUserInfo")
    @ResponseBody
    Boolean existsUserInfo(User user)
    {
        return userService.existsUserInfo(user);
    }

    @PostMapping("")
    @ResponseBody
    Boolean addFollow(Authentication authentication,String username)
    {
        return true;
    }



}
