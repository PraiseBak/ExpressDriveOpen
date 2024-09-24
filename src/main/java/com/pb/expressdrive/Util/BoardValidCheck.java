package com.pb.expressdrive.Util;

import com.pb.expressdrive.Domain.Entity.Board;


public class BoardValidCheck
{

    private static final int CONTENT_MAX = 4000;
    private static final int CONTENT_MIN = 2;
    private static final int TITLE_MAX = 40;
    private static final int TITLE_MIN = 2;

    public boolean isValidBoard(Board board)
    {
        int titleLen = board.getTitle().length();
        int contentLen = board.getContent().length();
        if(titleLen < TITLE_MIN || titleLen > TITLE_MAX) return false;
        return contentLen >= CONTENT_MIN && contentLen <= CONTENT_MAX;
    }

}
