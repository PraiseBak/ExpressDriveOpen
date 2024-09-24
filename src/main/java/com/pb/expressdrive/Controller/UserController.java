package com.pb.expressdrive.Controller;

import com.pb.expressdrive.Domain.Entity.User;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Helper.InterestEnum;
import com.pb.expressdrive.Service.UserService;
import com.pb.expressdrive.Util.UserValidCheck;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/user")
public class UserController
{
    private UserService userService;
    private UserValidCheck userValidCheck;

    @GetMapping("/login")
    public String login(@RequestParam(required = false) Boolean error, Model model)
    {
        if(error != null){
            model.addAttribute("error", ErrorInfo.USERNAME_NOT_FOUND);
        }
        return "user/auth/login";
    }

    @GetMapping("/signup")
    public String signup(Model model)
    {
        InterestEnum[] interestEnumList = InterestEnum.values();
        model.addAttribute(interestEnumList);
        return "user/auth/signup";
    }

    @PostMapping("/signup")
    public String signup(@RequestParam(name="interestList") List<Integer> interestList ,User user)
    {
        userService.signup(user,interestList);
        return "redirect:./login";
    }

    @GetMapping("/search")
    public String search(Model model,@RequestParam(required = false,defaultValue = "1") int page,@RequestParam(required = false,defaultValue = "") String requestUsername){
        model.addAttribute("page",page);
        model.addAttribute("usernameList",userService.getUsernameList(page,requestUsername));
        return "user/auth/search";
    }




}
