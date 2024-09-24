package com.pb.expressdrive.Controller;

import com.pb.expressdrive.Domain.Entity.Community;
import com.pb.expressdrive.Domain.Entity.Interest;
import com.pb.expressdrive.Domain.Entity.Post;
import com.pb.expressdrive.Domain.Entity.User;
import com.pb.expressdrive.Domain.Repository.InterestRepository;
import com.pb.expressdrive.Domain.Repository.UserRepository;
import com.pb.expressdrive.Helper.InterestEnum;
import com.pb.expressdrive.Service.CommunityService;
import com.pb.expressdrive.Service.InterestService;
import com.pb.expressdrive.Service.TraceService;
import com.pb.expressdrive.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

@Controller
@AllArgsConstructor
public class MainController
{
    private InterestService interestService;
    private UserService userService;
    private UserRepository userRepository;
    private InterestRepository interestRepository;
    private PasswordEncoder passwordEncoder;

    private CommunityService communityService;

    private TraceService traceService;

    @GetMapping("/test")
    @Transactional
    public String test(Authentication authentication)
    {
        if(!authentication.getName().equals("praisebak")) return "main";
        for (int i=0;i<100;i++){
            HashSet<Integer> interestSet = new HashSet<>();
            while (interestSet.size() != 3){
                interestSet.add((int) ((Math.random() * 10)% 7));
            }
            List<Interest> interests = new LinkedList<>();
            User user = User.builder()
                    .email("nongnong" + i + "@naver.com")
                    .password(passwordEncoder.encode("nongnong123"))
                    .username("nongnong" + i)
                    .interests(null)
                    .visitNum(null)
                    .build();
            Post post = Post.builder()
                            .content("더미콘텐트")
                            .title("더미타이틀")
                            .user(user)
                            .build();
            ArrayList<Post> list = new ArrayList<>();
            list.add(post);
            user.setPosts(list);

            user = userRepository.save(user);

            InterestEnum[] interestEnums = InterestEnum.values();
            for (int idx : interestSet)
            {
                Interest interest = new Interest(null, interestEnums[idx], user,null);
                interests.add(interestRepository.save(interest));
            }

            user.setInterests(interests);

//            System.out.println(userRepository.findByUsername("nongnong" + i).get().toString());
        }

        return "main";
    }

    @GetMapping("/")
    public String main(Model model)
    {
        List<Community> communityList = communityService.getCommunityList();
        model.addAttribute("communityList",communityList);

        return "main";
    }

//    @PostMapping("/2")
//    public String main(MultipartFile imgList)
//    {
//        System.out.println("text - ");
//        System.out.println(imgList);
////        List<Community> communityList = communityService.getCommunityList();
////        model.addAttribute("communityList",communityList);
//        return "daum";
//    }


    @GetMapping("/img")
    public String img(){
        System.out.println("이미지");
        return "/daumeditor/pages/trex/image";
    }


}
