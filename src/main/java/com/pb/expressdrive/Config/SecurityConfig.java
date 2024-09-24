package com.pb.expressdrive.Config;


import com.pb.expressdrive.Util.TraceValidCheck;
import com.pb.expressdrive.Util.UserValidCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig
{

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception  {
       return http

               .authorizeRequests()
               .antMatchers("/node_modules/**").permitAll()
               .antMatchers("/user/trace/list").permitAll()
               .antMatchers("/admin/**").hasRole("ADMIN")
               .antMatchers("/user/trace/**").hasRole("USER")
               .antMatchers("/community/entertain/write").hasRole("USER")

//               .antMatchers("/user/trace/**").permitAll()
               .antMatchers("/**").permitAll()
               .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()

               .and()
                    .formLogin()
                        .loginPage("/user/login")
                        .failureUrl("/user/login?error=true")
                        .defaultSuccessUrl("/")
                        .permitAll()
                .and()
                    .logout()
                        .logoutSuccessUrl("/")
                        .invalidateHttpSession(true)
                        .logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
                .and()
                    .csrf()
                       .ignoringAntMatchers("/user/logout")
                   .ignoringAntMatchers("/API/img/**")
                   .ignoringAntMatchers("/API/trace/**")

               .and()
                    .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserValidCheck userValidCheck()
    {
        return new UserValidCheck();
    }

    @Bean
    public TraceValidCheck traceValidCheck()
    {
        return new TraceValidCheck();
    }

}


// 페이지 권한 설정
//                .antMatchers("/admin/**").hasRole("ADMIN")
//                .antMatchers("/admin/**/**").hasRole("ADMIN")
//                .antMatchers("/user/userObjPage").authenticated()
//                .antMatchers("/user/myinfo").authenticated()
//                .antMatchers("/**").permitAll()
//                .and() // 로그인 설정
//                .formLogin()
//                .loginPage("/user/login")
//                .failureHandler(customAuthenticationFailHandler)
//                .defaultSuccessUrl("/")
//                .permitAll()
//                .and() // 로그아웃 설정
//                .logout()
//                .logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
//                .logoutSuccessUrl("/")
//                .invalidateHttpSession(true)
//                .and()
//                // 403 예외처리 핸들링
//                //this line has effect when user is authenticated
//                .exceptionHandling()
//                .accessDeniedPage("/error/noPermission");

//        http.csrf()
//                .ignoringAntMatchers("/API/**")
//                .ignoringAntMatchers("/gallery/**/**")
//                .ignoringAntMatchers("/gallery/**/modify/**")
//                .ignoringAntMatchers("/gallery/**/delete/**")
//                .ignoringAntMatchers("/gallery/**/postWrite/**")
//                .ignoringAntMatchers("/user/userObjAdd");
//
//        http.rememberMe()
//                .re memberMeParameter("remember-me")
//                .tokenValiditySeconds(3600)
//                .userDetailsService(userService)
//                .tokenRepository(tokenRepository());
//
//        http.oauth2Login()
//                .loginPage("/user/login").and().build();
