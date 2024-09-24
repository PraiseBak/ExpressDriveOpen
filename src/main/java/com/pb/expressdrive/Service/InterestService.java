package com.pb.expressdrive.Service;

import com.pb.expressdrive.Domain.Entity.Interest;
import com.pb.expressdrive.Domain.Entity.Todo;
import com.pb.expressdrive.Domain.Entity.User;
import com.pb.expressdrive.Domain.Repository.InterestRepository;
import com.pb.expressdrive.Domain.Repository.UserRepository;
import com.pb.expressdrive.Helper.InterestEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
public class InterestService
{
    private final HashMap<String,HashMap<String,Integer>> userRecommendMap = new HashMap<>();
    private final InterestRepository interestRepository;
    private final UserRepository userRepository;
    private static final int  RECOMMEND_WAIT_COUNT = 3;

    public List<Interest> convertToInterests(List<Integer> interests, User user, Todo todo)
    {
        if(interests == null){
            return null;
        }
        //정렬 후 변환
        interests.sort((o1, o2) -> (o1 - o2));

        List<Interest> interestList = new ArrayList<>();
        InterestEnum[] interestEnumList = InterestEnum.values();
        for(Integer interest : interests){
            interestList.add(Interest.builder()
                    .interest(interestEnumList[interest])
                    .user(user)
                    .todo(todo)
                    .build());
        }
        return  interestList;
    }

    //TODO
    //비효율적인것 어떻게 줄일지 1000개단위로? db 효율적으로 운영하는법 찾기
    //이미 추천된 유저면 스킵 >> 3회동안은 안뜨게 + 리팩토링 + 데이터 량 늘여서 트라이
    //글쓴 것 한개 이상
    @Transactional
    public List<User> getRecommendedUser(User curUser){
        HashMap<User,Integer> countInterestMap = new HashMap<>();
        HashSet<User> notRecommendedUserSet = new HashSet<>();
        //흥미 겹치는 빈도 카운트
        countInterests(curUser,countInterestMap,notRecommendedUserSet);

        //최소 조건 (10명) 채우기
        fillMinimumUsers(countInterestMap,notRecommendedUserSet, curUser.getUsername());
        List<User> sortedInterestMapList = getSortedRecommendedUsers(countInterestMap);
        //추천된 유저 체크
        checkRecommendedUser(sortedInterestMapList,curUser.getUsername());
        return sortedInterestMapList;
    }


    private void countInterests(User curUser, HashMap<User, Integer> countInterestMap, HashSet<User> notRecommendedUserSet)
    {
        List<User> readableUsers = userRepository.findAllByPostCountGreaterThanOrTodoCountGreaterThan(0,0);
        for(User user : readableUsers)
        {
            //같은 유저 제거
            if (user.getUsername().equals(curUser.getUsername())) continue;

            if(isRecentRecommendedUser(curUser.getUsername(),user.getUsername())){
                notRecommendedUserSet.add(user);
                continue;
            }
            countInterest(user,curUser,countInterestMap,notRecommendedUserSet);
        }
    }

    private boolean isRecentRecommendedUser(String curUsername,String recommendedUsername)
    {
        HashMap<String,Integer> userRecommendedCountMap = userRecommendMap.getOrDefault(curUsername,new HashMap<>());
        int val = 0;

        boolean result = true;
        if((val = userRecommendedCountMap.getOrDefault(recommendedUsername,0)) > RECOMMEND_WAIT_COUNT || val  == 0){
            //예전에 추천된 유저 + 대기 회수 초과
            if(val != 0)
                userRecommendedCountMap.put(recommendedUsername,0);
            result = false;
        }else{
            userRecommendedCountMap.put(recommendedUsername,val+1);
        }

        userRecommendMap.put(curUsername,userRecommendedCountMap);
        return result;
    }

    private List<User> getSortedRecommendedUsers(HashMap<User, Integer> countSameInterest)
    {
        List<Map.Entry<User,Integer >> sameInterestUserList = new LinkedList<>(countSameInterest.entrySet());
        sameInterestUserList.sort((o1, o2) -> o2.getValue() - o1.getValue());
        List<User> resultList = new ArrayList<>();

        for(Map.Entry<User,Integer> resultEntry : sameInterestUserList.subList(0,
                Math.min(sameInterestUserList.size(), 10))){
            resultList.add(resultEntry.getKey());
        }

        return resultList;
    }

    private void checkRecommendedUser(List<User> sameInterestUserList,String curUsername)
    {
        HashMap<String,Integer> countMap =userRecommendMap.getOrDefault(curUsername,new HashMap<>());
        for(User user: sameInterestUserList){
            countMap.put(user.getUsername(),countMap.getOrDefault(user.getUsername(),1));
        }
        userRecommendMap.put(curUsername,countMap);
    }


    private void countInterest(User user, User curUser, HashMap<User, Integer> countSameInterest, HashSet<User> etcUserSet)
    {
        for (Interest curInterest : curUser.getInterests())
        {
            if(curInterest.getUser() == null) continue;

            for (Interest objInterest : user.getInterests())
            {
                if(objInterest.getUser() == null) continue;

                if (Objects.equals(curInterest.getInterest().getCode(), objInterest.getInterest().getCode()))
                    countSameInterest.put(user, countSameInterest.getOrDefault(user, 0) + 1);
                else
                    etcUserSet.add(user);
            }
        }

    }

    private void fillMinimumUsers(HashMap<User, Integer> countSameInterest, HashSet<User> etcUserSet, String curUsername)
    {
        for(User user : etcUserSet){
            if(countSameInterest.size() >= 10) break;
            countSameInterest.put(user,0);
        }
        if(countSameInterest.size() < 10){
            Page<User> etcUserList = userRepository.findAll(PageRequest.of(0,11));
            for(User user : etcUserList){
                if(user.getUsername().equals(curUsername)) continue;
                if(countSameInterest.size() >= 10) break;
                countSameInterest.put(user,0);
            }
        }

    }

    public List<String> getInterestByUserId(User user){
        List<Interest> interestList = interestRepository.findAllByUserId(user.getId());
        InterestEnum[] interestEnumList = InterestEnum.values();
        List<String> result = new ArrayList<>();

        for(Interest i : interestList){
            result.add(i.getInterest().getStr());
        }

        return result;
    }


    public HashMap<String,Integer> getCountedTodoInterestMap(List<Todo> todoList) {
        HashMap<String,Integer> countedInterestMap = new HashMap<>();
        for(Todo t: todoList){
            if(t.getHide()) continue;
            for(Interest i : t.getInterests()){
                String key = i.getInterest().getStr();
                countedInterestMap.put(key,countedInterestMap.getOrDefault(key,0)+1);
            }
        }
        return countedInterestMap;
    }

    public HashMap<String,Integer> getPercentTodoInterestMap(List<Todo> todoList, Integer successMode) {
        HashMap<String,Integer> sizeInterestMap = new HashMap<>();
        HashMap<String,Integer> objInterestMap = new HashMap<>();
        for(Todo t: todoList){
            for(Interest i : t.getInterests()){
                String key = i.getInterest().getStr();
                sizeInterestMap.put(key, sizeInterestMap.getOrDefault(key,0)+1);
                if(successMode == 1){
                    if(!t.getChecked()) continue;
                }else{
                    if(!t.getDeleted()) continue;
                }
                objInterestMap.put(key,objInterestMap.getOrDefault(key,0)+1);
            }
        }

        for (String key:sizeInterestMap.keySet()) {
            int size = sizeInterestMap.getOrDefault(key,0);
            sizeInterestMap.put(key, (int) (((double)objInterestMap.getOrDefault(key,0) /(double)size) * 100));
        }
        return sizeInterestMap;
    }


}
