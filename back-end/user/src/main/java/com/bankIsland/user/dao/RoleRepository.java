package com.bankIsland.user.dao;

import com.bankIsland.user.entity.ERole;
import com.bankIsland.user.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(path = "authorities")
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(ERole name);

    @Override
    @RestResource(exported = false)
    void deleteById(Integer integer);

    @Override
    @RestResource(exported = false)
    void delete(Role entity);

    @Override
    @RestResource(exported = false)
    <S extends Role> S save(S entity);

    @Override
    @RestResource(exported = false)
    List<Role> findAll();

    @Override
    @RestResource(exported = false)
    Optional<Role> findById(Integer integer);

    @Override
    @RestResource(exported = false)
    void deleteAll();

}
