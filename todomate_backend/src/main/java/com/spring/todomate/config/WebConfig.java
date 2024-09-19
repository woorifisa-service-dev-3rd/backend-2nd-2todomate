package com.spring.todomate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class WebConfig{

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000"); // Access-Control-Allow-Origin  (Response에 자동으로 추가해줌)
        config.addAllowedHeader("*");  // Access-Control-Request-Headers
        config.addAllowedMethod("*"); // Access-Control-Request-Method
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}