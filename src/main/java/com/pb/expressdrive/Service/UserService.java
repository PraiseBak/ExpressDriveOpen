package com.pb.expressdrive.Service;

import com.pb.expressdrive.Domain.Entity.Interest;
import com.pb.expressdrive.Domain.Entity.Role;
import com.pb.expressdrive.Domain.Entity.User;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Helper.Error.InternalServerError;
import com.pb.expressdrive.Domain.Repository.UserRepository;
import com.pb.expressdrive.Util.InterestValidCheck;
import com.pb.expressdrive.Util.UserValidCheck;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("userService")
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService
{
    private static final int PAGE_UNIT = 30;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final InterestService interestService;
    private final UserValidCheck userValidCheck = new UserValidCheck();
    private final InterestValidCheck interestValidCheck = new InterestValidCheck();
    private final FollowService followService;
    private final PageService pageService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        User user = getUserByUsername(username);
        log.info("Success find member {}", user);
        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(Role.USER.getValue()));
        if( user.getRole() == Role.ADMIN){
            authorities.add(new SimpleGrantedAuthority(Role.ADMIN.getValue()));
        }
//        authorities.add(new SimpleGrantedAuthority(user.getRole().getValue()));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }

    public Boolean existsUserInfo(User user)
    {
        Optional<User> resultUser = userRepository.findByUsernameOrEmail(user.getUsername(),user.getEmail());
        return resultUser.isPresent();
    }

    public void signup(User user,List<Integer> interests)
    {
        if (!userValidCheck.isUserValid(user))  throw new InternalServerError(ErrorInfo.SIGNUP_ERROR.getCode(),ErrorInfo.SIGNUP_ERROR.getMessage());
        if(!interestValidCheck.isInterestsValid(interests, false)) throw new InternalServerError(ErrorInfo.SIGNUP_ERROR.getCode(),ErrorInfo.SIGNUP_ERROR.getMessage());

        List<Interest> interestList = interestService.convertToInterests(interests,user, null);
        user.setInterests(interestList);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(userRepository.save(user).getUsername() + " has been signup");
    }

    public User getUserByUsername(String username)
    {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(ErrorInfo.USERNAME_NOT_FOUND.getMessage()));
    }

    public User getUserByAuth(Authentication authentication)
    {
        String username = authService.getUsername(authentication);
        return getUserByUsername(username);
    }

    public Long getUserIdByAuth(Authentication authentication)
    {
        return getUserByAuth(authentication).getId();
    }

    @Transactional
    public void visit(String username)
    {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            User curUser = user.get();
            curUser.setVisitNum(curUser.getVisitNum()+1);
            followService.readBroadcast(curUser);

        }
    }

    @Transactional  
    public void setFollow(String requestUser, String followedUser)
    {
        User user = this.getUserByUsername(requestUser);
        followService.setFollow(requestUser,followedUser,user);

    }

    @Transactional
    public void cancelFollow(String username, String objUsername)
    {
        User user = this.getUserByUsername(username);
        followService.cancelFollow(username,objUsername,user);
    }

    public List<String> getUsernameList(int page, String requestUsername)
    {
        Pageable pageable = pageService.getPageable(page);
        Page<User> userList;
        if(requestUsername.length() == 0) userList = userRepository.findAll(pageable);
        else userList = userRepository.findAllByUsernameContaining(pageable,requestUsername);
        ArrayList<String> usernameList = new ArrayList<>();
        for (User user: userList) {
            usernameList.add(user.getUsername());
        }
        return usernameList;
    }

    private Pageable getPageable(int startPage){
        return PageRequest.of(startPage,startPage+PAGE_UNIT+1, Sort.by("id").descending());
    }

    @Transactional
    public void setProfileImgSrc(Authentication authentication, String path) {
        User user = getUserByAuth(authentication);
        user.setUserProfileImgSrc(path);
    }

}
