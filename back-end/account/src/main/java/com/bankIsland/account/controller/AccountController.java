package com.bankIsland.account.controller;

import com.bankIsland.account.controller.request.AccountCreationRequest;
import com.bankIsland.account.controller.response.MessageResponse;
import com.bankIsland.account.entity.Account;
import com.bankIsland.account.security.jwt.JwtUtils;
import com.bankIsland.account.service.AccountService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AccountService accountService;

    @PostMapping
    public ResponseEntity createAccount(@RequestHeader("Authorization") String token, @RequestBody AccountCreationRequest request) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
//        rabbitTemplate.convertAndSend("userQueue", token);
        int userId = jwtUtils.getUserIdFromJwtToken(token);
        List<Account> accounts = accountService.findAllByUserId(userId);
        Random rand = new Random();
        if (accounts.size() == 0) {
            int value = rand.nextInt(1000000000);
            Account newAccount = new Account("IT" + value, 0, false, userId);
            return ResponseEntity.ok(accountService.save(newAccount));
        } else {
            try {
                Account account = accountService.findByAccountNumber(request.getAccountNumber());
                if (userId == account.getUserId()) {
                    if (request.getAmount() <= account.getBalance() && request.getAmount() > 0) {
                        int value = rand.nextInt(1000000000);
                        account.setBalance(account.getBalance() - request.getAmount());
                        accountService.save(account);
                        Account newAccount = new Account("IT" + value, request.getAmount(), false, userId);
                        return ResponseEntity.ok(accountService.save(newAccount));
                    } else {
                        return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid amount."));
                    }
                }
            } catch (NoSuchElementException e) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid accountNumber."));
            }
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid request."));
        }
    }

    @DeleteMapping
    public ResponseEntity deleteAccount(@RequestHeader("Authorization") String token, @RequestBody AccountCreationRequest request) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
//        rabbitTemplate.convertAndSend("userQueue", token);
        int userId = jwtUtils.getUserIdFromJwtToken(token);
        List<Account> accounts = accountService.findAllByUserId(userId);
        Random rand = new Random();
        if (accounts.size() == 0) {
            int value = rand.nextInt(1000000000);
            Account newAccount = new Account("IT" + value, 0, false, userId);
            return ResponseEntity.ok(accountService.save(newAccount));
        } else {
            try {
                Account account = accountService.findByAccountNumber(request.getAccountNumber());
                if (userId == account.getUserId()) {
                    if (request.getAmount() <= account.getBalance() && request.getAmount() > 0) {
                        int value = rand.nextInt(1000000000);
                        account.setBalance(account.getBalance() - request.getAmount());
                        accountService.save(account);
                        Account newAccount = new Account("IT" + value, request.getAmount(), false, userId);
                        return ResponseEntity.ok(accountService.save(newAccount));
                    } else {
                        return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid amount."));
                    }
                }
            } catch (NoSuchElementException e) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid accountNumber."));
            }
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid request."));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity validateAccount(@PathVariable int id){
        try {
            Account account = accountService.findById(id);
            account.setActive(true);
            accountService.save(account);
            return ResponseEntity.ok(new MessageResponse("Success"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAccount(@PathVariable int id){
        try {
            Account account = accountService.findById(id);
            accountService.delete(account);
            return ResponseEntity.ok(new MessageResponse("Success"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error"));
        }
    }
}
