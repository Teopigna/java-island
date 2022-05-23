package com.bankIsland.account.controller;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping
    public void createAccount(@RequestHeader("Authorization") String token) {// @RequestBody AccountCreationRequest accountCreationRequest) {

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        rabbitTemplate.convertAndSend("userQueue", token);
    }


}
