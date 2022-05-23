package com.bankIsland.user.controller.payload.request;

public class IdRequest {

    private String token;

    public IdRequest() {
    }

    public IdRequest(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
