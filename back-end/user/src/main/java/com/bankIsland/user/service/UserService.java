package com.bankIsland.user.service;

import com.bankIsland.user.entity.User;

public interface UserService {

    public User save(User user);

    public boolean existsByUsername(String username);

    public User findByUsername(String username);

}
