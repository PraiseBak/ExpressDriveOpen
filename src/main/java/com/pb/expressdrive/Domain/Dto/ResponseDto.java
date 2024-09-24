package com.pb.expressdrive.Domain.Dto;


import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResponseDto
{
    private int code;
    private String msg;
}
