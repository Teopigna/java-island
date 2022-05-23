import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CardService {
  arrayCards = [
    {
      saldoUtente: 237.54,
      iban: 'IT60X0542811101000000123456',
      active: true,
    },
    {
      saldoUtente: 2370.54,
      iban: 'IT60X0542811101000000145656',
      active: false,
    },
    {
      saldoUtente: 1137.54,
      iban: 'IT60X0542811101000000199396',
      active: true,
    },
  ];
  currentIndex = 0;
  cardDisplayed = this.arrayCards[this.currentIndex];
}
