package com.bankIsland.account.service;

import com.bankIsland.account.entity.Account;

import java.util.List;

public interface AccountService {

    public Account save(Account account);

    public void delete(Account account);

    public Account findById(int id);

    public Account findByAccountNumber(String accountNumber);

    public List<Account> findAllByUserId(int userId);

}
