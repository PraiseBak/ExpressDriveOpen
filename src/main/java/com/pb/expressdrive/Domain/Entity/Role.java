package com.pb.expressdrive.Domain.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role
{
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN"),
    BLOCKED("ROLE_BLOCKED");

    private String value;
}
