package com.pb.expressdrive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ExpressDriveApplication
{

    public static void main(String[] args)
    {
        SpringApplication.run(ExpressDriveApplication.class, args);
    }

}
