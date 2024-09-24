package com.pb.expressdrive.Controller;

import com.pb.expressdrive.Helper.Error.InternalServerError;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;

//@RestControllerAdvice
public class ErrorController
{

    //TODO 제대로 동작하지 않음 제대로 공부하고 다시 사용해보기
//    @ExceptionHandler({InternalServerError.class, UsernameNotFoundException.class})
//    public ModelAndView internalAuthenticationServiceException(InternalServerError e, HttpServletRequest request, RedirectAttributes redirectAttributes){
//        ModelAndView mav = new ModelAndView("redirect:" + request.getHeader("Referer"));
//        redirectAttributes.addFlashAttribute("error",e);
//        return mav;
//    }
}
