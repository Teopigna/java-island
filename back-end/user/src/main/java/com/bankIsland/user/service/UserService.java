package com.bankIsland.user.service;

import com.bankIsland.user.entity.User;

public interface UserService {

    public User save(User user);

    public User findByUsername(String username);

}
