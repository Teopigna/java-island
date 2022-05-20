import { Component, OnInit } from '@angular/core';

interface accountInterface {
  iban: string;
  saldo: number;
  population: number;
}

const arrayAccounts: accountInterface[] = [
  {
    iban: '0000000000001',
    saldo: 17075200,
    population: 146989754,
  },
  {
    iban: '0000000000002',
    saldo: 9976140,
    population: 36624199,
  },
];

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})
export class AccountManagementComponent implements OnInit {
  accounts = arrayAccounts;
  constructor() {}

  ngOnInit(): void {}
}
