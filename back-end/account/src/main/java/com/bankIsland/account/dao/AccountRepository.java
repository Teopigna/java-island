package com.bankIsland.account.dao;

import com.bankIsland.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {

//    Optional<Account> findByUserId(int userId);
//    Boolean existsByEmail(String email);

    @Override
    @RestResource(exported = false)
    void deleteById(Integer id);

    @Override
    @RestResource(exported = false)
    void delete(Account account);

    @Override
    @RestResource(exported = false)
    <S extends Account> S save(S entity);

    @Override
    @RestResource(exported = false)
    List<Account> findAll();

    @Override
    @RestResource(exported = false)
    Optional<Account> findById(Integer id);

    @Override
    @RestResource(exported = false)
    void deleteAll();

}
