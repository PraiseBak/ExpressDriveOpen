package com.pb.expressdrive.Util;

import java.util.List;

public class InterestValidCheck
{
    private static final int IDX_START = 0;
    private static final int IDX_END = 7;

    public boolean isInterestsValid(List<Integer> interests, boolean isTrace){
        if(!isTrace && interests.size() != 3) return false;
        if(isTrace && interests == null) return true;

        for(Integer interestIdx : interests){
            if(!(IDX_START <= interestIdx && interestIdx <= IDX_END)) return false;
        }
        return true;
    }
}
