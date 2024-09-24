//package com.pb.expressdrive;
//
//import com.pb.expressdrive.Domain.Entity.Interest;
//import com.pb.expressdrive.Domain.Entity.User;
//import com.pb.expressdrive.Helper.InterestEnum;
//import com.pb.expressdrive.Service.InterestService;
//import com.pb.expressdrive.Service.UserService;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.springframework.boot.SpringBootConfiguration;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//
//import javax.transaction.Transactional;
//import java.util.*;
//
//@SpringBootTest
//@SpringBootConfiguration
//@Rollback(value = true)
//class ExpressDriveApplicationTests
//{
//    @InjectMocks
//    private InterestService interestService;
//    @InjectMocks
//    private UserService userService;
//
//    @Test
//    @Transactional
//    void 추천기능_테스트()
//    {
//         User user = userService.getUserByUsername("praisebak");
//         List<User> recommendUserList = interestService.getRecommendedUser(user);
//         for (User curUser : recommendUserList){
//             System.out.println(curUser.toString());
//             for (Interest interest : curUser.getInterests()){
//                 System.out.println(interest.getInterest().getStr());
//             }
//             System.out.println();
//         }
//
//    }
//
//    @Test
//    void 코드_테스트(){
//
//
//
//    }
//
////    @Test
////    @Transactional
////    void 유저_더미데이터_삽입()
////    {
////        for (int i=0;i<100;i++){
////            HashSet<Integer> interestSet = new HashSet<>();
////            while (interestSet.size() != 3){
////                interestSet.add((int) ((Math.random() * 10)% 7));
////            }
////            List<Interest> interests = new LinkedList<>();
////            User user = new User();
////            for (int idx : interestSet)
////            {
////                Interest interest = new Interest(null, idx, user);
////                interests.add(interestRepository.save(interest));
////            }
////            user = User.builder()
////                    .email("nongnong" + i + "@naver.com")
////                    .password(passwordEncoder.encode("nongnong123" + i))
////                    .username("nongnong" + i + "")
////                    .interests(interests)
////                    .build();
////            userRepository.save(user);
////            System.out.println(userRepository.findByUsername("nongnong" + i).get().toString());
////        }
////
////    }
//
//}
