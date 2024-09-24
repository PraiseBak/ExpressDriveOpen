package com.pb.expressdrive.Domain.Dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSearchDto {
    String profileImgSrc;
    String username;
    String email;
    int traceCount;

}
