package com.pb.expressdrive.Helper.Error;

import org.springframework.web.client.HttpServerErrorException;

public class InternalServerError extends CustomError
{
    public InternalServerError(int code,String message)
    {
        super(code,message);
    }
}
