package com.bankIsland.user.service;

import com.bankIsland.user.dao.AccountOwnerRepository;
import com.bankIsland.user.entity.AccountOwner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountOwnerServiceImpl implements AccountOwnerService {

    private AccountOwnerRepository accountOwnerRepository;

    @Autowired
    public AccountOwnerServiceImpl(AccountOwnerRepository accountOwnerRepository) {
        this.accountOwnerRepository = accountOwnerRepository;
    }

    @Override
    public AccountOwner save(AccountOwner accountOwner) {
        return accountOwnerRepository.save(accountOwner);
    }

    @Override
    public AccountOwner findByEmail(String email) {
        return accountOwnerRepository.findByEmail(email).get();
    }
}









