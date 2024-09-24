package com.pb.expressdrive.Helper.Error;

import com.pb.expressdrive.Domain.Dto.ResponseDto;
import lombok.*;


@Setter
@Getter
@RequiredArgsConstructor
public class CustomError extends RuntimeException
{
    private final int code;
    private final String message;

//    public CustomError(RuntimeException error){
//        CustomError customError = (CustomError) error;
//        if(customError.code == -1){
//            this.msg = error.getMessage();
//        }
//    }

    public ResponseDto convertToResponse(){
            return new ResponseDto(code,message);
    }
}
