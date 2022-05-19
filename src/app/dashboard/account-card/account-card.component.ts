import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css'],
})
export class AccountCardComponent implements OnInit {
  saldoUtente = 237.54;
  iban = 'IT60X0542811101000000123456';

  constructor() {}

  ngOnInit(): void {}
}
