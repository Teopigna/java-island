<<<<<<< HEAD
package com.bankIsland.user.controller.payload.response;

import com.bankIsland.user.entity.AccountOwner;

public class UserLoginResponse {

    private String token;
    private AccountOwner accountOwner;
    private String role;

    public UserLoginResponse() {
    }

    public UserLoginResponse(String token, AccountOwner accountOwner, String role) {
        this.token = token;
        this.accountOwner = accountOwner;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public AccountOwner getAccountOwner() {
        return accountOwner;
    }

    public void setAccountOwner(AccountOwner accountOwner) {
        this.accountOwner = accountOwner;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
=======
package com.bankIsland.user.controller.payload.response;

import com.bankIsland.user.entity.AccountOwner;

public class UserLoginResponse {

    private String token;
    private AccountOwner accountOwner;
    private String role;

    public UserLoginResponse() {
    }

    public UserLoginResponse(String token, AccountOwner accountOwner, String role) {
        this.token = token;
        this.accountOwner = accountOwner;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public AccountOwner getAccountOwner() {
        return accountOwner;
    }

    public void setAccountOwner(AccountOwner accountOwner) {
        this.accountOwner = accountOwner;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
>>>>>>> ee37e97904af707849b7a4ce91d88a1bd319178c
