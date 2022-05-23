package com.bankIsland.account.controller.request;

public class AccountCreationRequest {

    private String accountNumber;
    private double amount;

    public AccountCreationRequest() {
    }

    public AccountCreationRequest(String accountNumber, double amount) {
        this.accountNumber = accountNumber;
        this.amount = amount;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
