package com.projecttycoon.demo.config;


import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


//로그인 설정 클래스
//인증 인가 처리및 Permission 처리
@Log4j2
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    //비밀번호 암호화 Bean 암호화를 하지 않으면 동작하지 않는다.
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    UrlBasedCorsConfigurationSource source;
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }

    //Filter Chain 설정 인가에 대한 상세 처리를 구현한다.
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeRequests(auth -> {
                    auth.antMatchers("/public/**", "/all", "/**").permitAll()
                            .antMatchers("/member").hasRole("Member")
                            .antMatchers("/admin").hasRole("Admin")
                            .anyRequest().authenticated();
                })
                .formLogin()
                .loginPage("/PageLogin/index.html")
                .loginProcessingUrl("/login")
                .successHandler(new CustomLoginSuccessHandler())


                .usernameParameter("memberId")
                .passwordParameter("memberPw")
                .defaultSuccessUrl("/")

                .and()

                .logout()
                .logoutUrl("/api/logoutProcess")
                .logoutSuccessUrl("/")


                .and()
                .csrf().disable();

        return httpSecurity.build();
    }
}
