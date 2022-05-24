package com.bankIsland.user.service;

import com.bankIsland.user.entity.AccountOwner;

public interface AccountOwnerService {

    public AccountOwner save(AccountOwner accountOwner);

    public AccountOwner findByEmail(String email);

}
