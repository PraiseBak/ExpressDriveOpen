package com.pb.expressdrive.APIController.Image;


import com.pb.expressdrive.Domain.Dto.ImgDto;
import com.pb.expressdrive.Domain.Dto.ResponseDto;
import com.pb.expressdrive.Service.ImgService;
import com.pb.expressdrive.Service.TraceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

//Todo 리팩토링할려고 만듦
@RestController
@RequestMapping(value = {"/API/img"})
@AllArgsConstructor
@Slf4j
public class ImageAPIController {

    private TraceService traceService;
    private ImgService imgService;

    @ResponseBody
    @PostMapping(value = "/",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ImgDto> imgUpload(MultipartHttpServletRequest req) {
        List<MultipartFile> imgList = req.getFiles("imgList[]");
        ResponseDto responseDto = new ResponseDto(200,"");
        List<ImgDto> imgDtoList = new ArrayList<>();
        imgDtoList = imgService.addImg(imgList,false);

        return imgDtoList;
    }

    @ResponseBody
    @PostMapping(value = "/validation")
    public ResponseDto validation(MultipartFile img){
        ResponseDto responseDto = new ResponseDto(200,"");
        imgService.validation(Collections.singletonList(img),responseDto);
        return responseDto;

    }


}
