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

  transactions = [
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '1',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: -40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '1',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: -100,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '1',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: -400,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '1',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: -40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '1',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '2',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '3',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '4',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '5',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '6',
    },
    {
      id: 1,
      type: 'versamento',
      amount: 3,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '7',
    },
    {
      id: 1,
      type: 'versamento',
      amount: 27.99,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '8',
    },
    {
      id: 1,
      type: 'giroconto',
      amount: 100,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '9',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40.92,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '10',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 234,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '11',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '12',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '13',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '14',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: '15',
    },
  ];

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
