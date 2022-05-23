package com.bankIsland.account.dto;

public class AccountDto {

    private int id;
    private String accountNumber;
    private double balance;
    private boolean isActive;
    private int userId;

    public AccountDto() {
    }

    public AccountDto(String accountNumber, double balance, boolean isActive, int userId) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.isActive = isActive;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
