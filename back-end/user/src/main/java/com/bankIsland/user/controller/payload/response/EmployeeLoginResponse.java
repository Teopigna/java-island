<<<<<<< HEAD
package com.bankIsland.user.controller.payload.response;

import com.bankIsland.user.entity.User;

public class EmployeeLoginResponse {

    private String token;
    private User user;
    private String role;

    public EmployeeLoginResponse() {
    }

    public EmployeeLoginResponse(String token, User user, String role) {
        this.token = token;
        this.user = user;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

import com.bankIsland.user.entity.User;

public class EmployeeLoginResponse {

    private String token;
    private User user;
    private String role;

    public EmployeeLoginResponse() {
    }

    public EmployeeLoginResponse(String token, User user, String role) {
        this.token = token;
        this.user = user;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
>>>>>>> ee37e97904af707849b7a4ce91d88a1bd319178c
