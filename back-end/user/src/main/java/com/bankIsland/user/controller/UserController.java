package com.bankIsland.user.controller;

import com.bankIsland.user.controller.payload.request.IdRequest;
import com.bankIsland.user.security.jwt.JwtUtils;
import com.bankIsland.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping
    public int findId(@RequestBody IdRequest idRequest){
        return userService
                .findByUsername(jwtUtils.getUserNameFromJwtToken(idRequest.getToken()))
                .getId();
    }
}
