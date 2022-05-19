package com.bankIsland.user.controller.payload.response;

import java.util.LinkedList;
import java.util.List;

public class JwtResponse {

    private String token;
    private int id;
    private String username;
    private List<String> roles = new LinkedList<>();

    public JwtResponse() {
    }

    public JwtResponse(String token, int id, String username, List<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
