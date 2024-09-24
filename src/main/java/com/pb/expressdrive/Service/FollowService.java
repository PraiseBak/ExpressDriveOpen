package com.pb.expressdrive.Service;

import com.pb.expressdrive.Domain.Entity.*;
import com.pb.expressdrive.Domain.Repository.FollowRepository;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Helper.Error.UserAuthDenied;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService
{
    private final FollowRepository followRepository;

    Following getFollowFromUser(User user, String objUsername){
        for(Following following : user.getFollowings()){
            if(following.getFollowedUsername().equals(objUsername)){
                return following;
            }
        }
        return null;
    }

    void setRead(User user, String objUsername, Boolean read){
        Following following;
        if((following = getFollowFromUser(user,objUsername)) != null) following.setIsRead(read);
    }

    @Transactional
    public void setFollow(String followingUsername, String followedUsername, User followingUser)
    {
        // TODO THINK: 2022-12-06 성능을 위해서라면 삭제할 수도 어차피 중복생김으로써 생기는 문제는 없음
        if(followingUser.getFollowings().stream().anyMatch(o -> o.getFollowedUsername().equals(followedUsername))) {
            return;
        }

        Following following = Following.builder()
                .followedUsername(followedUsername)
                .followingUsername(followingUsername)
                .user(followingUser)
                .isRead(true)
                .build();
        followingUser.getFollowings().add(following);
    }


    @Transactional
    public void cancelFollow(String username, String objUsername, User user)
    {
        Following following = user.getFollowings().stream()
                .filter(o -> o.getFollowedUsername().equals(objUsername))
                .findFirst()
                .orElseThrow(() -> new UserAuthDenied(ErrorInfo.USER_AUTH_DENIED.getCode(), ErrorInfo.USER_AUTH_DENIED.getMessage()));
        user.getFollowings().remove(following);
    }

    @Transactional
    public void setReads(User user, boolean read)
    {
        List<Following> followings = user.getFollowings();
        for(Following following : followings){
            following.setIsRead(read);
        }
    }

    @Transactional
    public <T> void writeBroadcast(User writeUser, T writeObj){

        List<Following> followingList = followRepository.findAllByFollowedUsername(writeUser.getUsername());

        System.out.println(followingList.size());
        for(Following following : followingList){
            if(writeObj instanceof Todo)
            {
                following.setRecentTodo((Todo) writeObj);
            }else{
                following.setRecentPost((Post) writeObj);
            }
        }
    }

    public List<String> getRecentWrite(User user)
    {
        List<String> resultList = new ArrayList<>();
        for(Following following : user.getFollowings()) {
            String head = following.getFollowedUsername();
            String result = "";

            Object writeObj = following.getRecentTodo() == null ? following.getRecentPost() : following.getRecentTodo();
            if(writeObj == null) {
                resultList.add(head + "님의 새 피드가 없습니다");
                continue;
            }
            head += "님의 새 피드가 있습니다 : ";
            if(writeObj instanceof Todo) result = ((Todo) writeObj).getContent();
            else result = ((Post) writeObj).getTitle();
            resultList.add(head + (result.length() > 10 ? result.substring(0, Math.min(result.length(), 10)) + "..." : result));
        }
        return resultList;
    }

    public void readBroadcast(User curUser)
    {
        List<Following> followingList = followRepository.findAllByFollowedUsername(curUser.getUsername());
        for (Following following : followingList)
        {
            following.setIsRead(true);
        }
    }
}
