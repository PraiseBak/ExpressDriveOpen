package com.pb.expressdrive.Util;

import com.pb.expressdrive.Domain.Entity.User;
import org.springframework.context.annotation.Bean;


public class UserValidCheck
{
    public boolean isUserValid(User user)
    {
        return isUsernameValid(user.getUsername()) && isPasswordValid(user.getPassword()) && isEmailValid(user.getEmail());
    }

    private boolean isUsernameValid(String username)
    {
        String regex = "^[A-Za-z0-9]{8,16}$";
        return username.matches(regex);
    }

    private boolean isPasswordValid(String password)
    {
        String regex = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$";
        return password.matches(regex);
    }

    private boolean isEmailValid(String email)
    {
        String regex = "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$";
        return email.matches(regex);
    }

}
