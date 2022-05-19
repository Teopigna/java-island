package com.bankIsland.apigateway.entity;

import javax.persistence.*;

@Entity
@Table(name = "roles", schema = "spring_security_final_challenge")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private ERole name;

    public Role() {
    }

    public Role(ERole name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}