package com.bankIsland.apigateway.config;

import com.bankIsland.apigateway.filter.JwtAuthenticationFilter;
import com.bankIsland.apigateway.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfiguration {

    @Autowired
    private JwtAuthenticationFilter filter;

    @Autowired
    private JwtUtils jwtUtils;

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {

        return builder.routes()
                .route(p -> p.path("/api/auth/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://user"))
                .build();
    }
}
