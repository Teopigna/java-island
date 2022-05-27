import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Card {
  saldoUtente: number;
  iban: string;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class CardService {
  cardChanged = new BehaviorSubject<Card>({
    saldoUtente: 237.54,
    iban: 'IT60X0542811101000000123456',
    active: true,
  });

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
