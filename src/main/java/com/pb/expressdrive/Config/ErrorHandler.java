package com.pb.expressdrive.Config;

import com.pb.expressdrive.Helper.Error.CustomException;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Helper.Error.ErrorResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;


@RestControllerAdvice
public class ErrorHandler {
    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponseEntity> handleCustomException(CustomException e) {
        return ErrorResponseEntity.toResponseEntity(e.getErrorInfo());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseEntity> processValidationError(MethodArgumentNotValidException ex) {
        return ErrorResponseEntity.toResponseEntity(ErrorInfo.VALID_CHECK_ERROR.getCode(), ex.getBindingResult().getAllErrors().get(0).getDefaultMessage());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponseEntity> processConstraintValidationError(ConstraintViolationException ex) {
        // I only need the first violation
        ConstraintViolation<?> violation = ex.getConstraintViolations().iterator().next();
        return ErrorResponseEntity.toResponseEntity(ErrorInfo.VALID_CHECK_ERROR.getCode(), violation.getMessage());
    }

}
