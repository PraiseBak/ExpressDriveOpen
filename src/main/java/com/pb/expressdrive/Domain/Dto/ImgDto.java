package com.pb.expressdrive.Domain.Dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ImgDto {
    private String imageurl;
    private String filename;
    private String originalurl;
    private String thumburl;
    private String filesize;
    private String imagealign;


}
