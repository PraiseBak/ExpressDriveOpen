package com.pb.expressdrive.Helper.Error;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
@Builder
public class ErrorResponseEntity {
    private int status;
    private String message;

    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(ErrorInfo e){
        return ResponseEntity
                .status(e.getCode())
                .body(ErrorResponseEntity.builder()
                        .status(e.getCode())
                        .message(e.getMessage())
                        .build()
                );
    }

    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(int status,String message){
        return ResponseEntity
                .status(status)
                .body(ErrorResponseEntity.builder()
                        .status(status)
                        .message(message)
                        .build()
                );
    }
}