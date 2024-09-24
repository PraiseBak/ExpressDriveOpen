package com.pb.expressdrive.APIController.Trace;

import com.pb.expressdrive.Domain.Dto.ResponseDto;
import com.pb.expressdrive.Domain.Entity.Post;
import com.pb.expressdrive.Domain.Entity.Todo;
import com.pb.expressdrive.Helper.Error.CustomError;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Service.ImgService;
import com.pb.expressdrive.Service.TraceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = {"/API/trace"})
@AllArgsConstructor
@Slf4j
//다음에는 Trace 이렇게 나누는게 아니라 todo, post 이렇게 나누자
public class TraceAPIController
{
    private TraceService traceService;

    private ImgService imgService;



    @PostMapping("/")
    public <T> ResponseDto addTrace(Todo todo, Post post, Integer mode, Authentication authentication,
                                    @RequestParam(name="interestList",required = false) List<Integer> interestList,
                                    @RequestParam(value = "img",required = false) MultipartFile multipartFile,
                                    @RequestParam(name="todoElemContentList",required = false) List<String> todoElemContentList) {
        ResponseDto responseDto = new ResponseDto(200,"");
        T writeObj = mode == 0 ? (T) todo : (T) post;
        String imgSrc = traceService.addImg(multipartFile);
        traceService.write(writeObj,authentication, interestList,imgSrc,todoElemContentList);
        return responseDto;
    }

    @DeleteMapping("/")
    public ResponseDto remove(int mode, Long id,
                              @RequestParam(defaultValue = "''") String cause,Authentication authentication)
    {
        ResponseDto responseDto = new ResponseDto(200,"");
        try{
            traceService.delete(mode,id,authentication,cause);
        }catch (Exception e){
            responseDto = new ResponseDto(500,ErrorInfo.COMMON_ERROR.getMessage());
        }
        return responseDto;
    }

//    @PatchMapping("/")
//    public  <T> ResponseDto update(Todo todo, Post post,int mode, Long id,
//                                   @RequestParam(name="interestList[]",required = false) List<Integer> interestList,Authentication authentication)
//    {
//        ResponseDto responseDto = new ResponseDto(200,"");
//        try {
//            T writeObj = mode == 0 ? (T) todo : (T) post;
//            traceService.update(writeObj,id,authentication,interestList);
//        }catch (RuntimeException e){
//            e.printStackTrace();
//            if(e instanceof CustomError){
//                responseDto = ((CustomError) e).convertToResponse();
//            }else{
//                responseDto = new ResponseDto(500,ErrorInfo.COMMON_ERROR.getMessage());
//            }
//        }
//        return responseDto;
//    }

    @PatchMapping("/check")
    public  <T> ResponseDto check(Long id,Authentication authentication, @RequestParam(defaultValue = "''") String cause)
    {
        ResponseDto responseDto = new ResponseDto(200,"");
        try {
            traceService.check(id,authentication,cause);
        }catch (RuntimeException e){
            if(e instanceof CustomError){
                responseDto = ((CustomError) e).convertToResponse();
            }else{
                responseDto = new ResponseDto(500,ErrorInfo.COMMON_ERROR.getMessage());
            }
        }
        return responseDto;
    }

    @PostMapping("/editProfile")
    public <T> ResponseDto editProfile(@RequestParam(value = "text",required = false) String text, Authentication authentication,
                                       @RequestParam(value = "linkA",required = false) String linkA,
                                       @RequestParam(value = "linkB",required = false) String linkB,
                                       @RequestParam(value = "img",required = false) MultipartFile multipartFile){

        ResponseDto responseDto = new ResponseDto(200,"");
        try {
            traceService.editProfile(text,linkA,linkB,authentication);
            String imgSrc = traceService.addImg(multipartFile);
            imgService.setUserProfileImgSrc(authentication,imgSrc);

        }catch (RuntimeException e){
            e.printStackTrace();
            if(e instanceof CustomError){
                responseDto = ((CustomError) e).convertToResponse();
            }else{
                responseDto = new ResponseDto(500,ErrorInfo.COMMON_ERROR.getMessage());
            }
        }
        return responseDto;
    }


    //1.체크만 했을 경우 - 완
    //2.post 수정
    //3.todo 수정
    @PatchMapping("/")
    public <T> ResponseDto update(Todo todo, Post post, Authentication authentication,
                              @RequestParam(value = "mode") String mode,
                              @RequestParam(value = "id") Long id,
                              @RequestParam(name="interestList",required = false) List<Integer> interestList,
                              @RequestParam(value = "img",required = false) MultipartFile multipartFile,
                              @RequestParam(name="todoElemContentList",required = false) List<String> todoElemContentList
                              ){

        ResponseDto responseDto = new ResponseDto(200,"");

        //TodoElem 수정
        if(mode.equals("TodoElemCheck")){
            traceService.checkTodoElem(id,authentication);
        }else{
            try {
                String imgSrc = null;
                T writeObj = mode.equals("0") ? (T) todo : (T) post;
                if(multipartFile != null){
                    imgSrc = traceService.addImg(multipartFile);
                }
                traceService.update(writeObj,id,authentication,interestList,todoElemContentList,imgSrc);


            }catch (RuntimeException e){
                e.printStackTrace();
                if(e instanceof CustomError){
                    responseDto = ((CustomError) e).convertToResponse();
                }else{
                    responseDto = new ResponseDto(500,ErrorInfo.COMMON_ERROR.getMessage());
                }
            }

        }

        return responseDto;
    }




}
