package com.pb.expressdrive.APIController.User;


import com.pb.expressdrive.Domain.Dto.ResponseDto;
import com.pb.expressdrive.Domain.Entity.User;
import com.pb.expressdrive.Helper.Error.CustomError;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Service.AuthService;
import com.pb.expressdrive.Service.FollowService;
import com.pb.expressdrive.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/API/follow")
@RequiredArgsConstructor
public class FollowAPIController
{
    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/")
    @ResponseBody
    public <T> ResponseDto setFollow(Authentication authentication,String objUsername){
        ResponseDto responseDto = new ResponseDto(200,"");
        try{
            userService.setFollow(authService.getUsername(authentication),objUsername);
        }catch (RuntimeException e){
            if(e instanceof CustomError){
                responseDto = ((CustomError) e).convertToResponse();
            }else{
                responseDto = new ResponseDto(500, ErrorInfo.COMMON_ERROR.getMessage());
            }
        }
        return responseDto;
    }

    @DeleteMapping("/")
    @ResponseBody
    public <T> ResponseDto cancelFollow(Authentication authentication,String objUsername){
        ResponseDto responseDto = new ResponseDto(200,"");
        try{
            userService.cancelFollow(authService.getUsername(authentication),objUsername);
        }catch (RuntimeException e){
            if(e instanceof CustomError){
                responseDto = ((CustomError) e).convertToResponse();
            }else{
                responseDto = new ResponseDto(500, ErrorInfo.COMMON_ERROR.getMessage());
            }
        }
        return responseDto;
    }

}
