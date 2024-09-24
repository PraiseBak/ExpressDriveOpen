package com.pb.expressdrive.Service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService
{
    public String getUsername(Authentication auth)
    {
        return auth.getName();
    }
}
