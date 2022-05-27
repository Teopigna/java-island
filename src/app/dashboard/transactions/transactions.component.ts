import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
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

  transactionsDisplayed: {
    id: number;
    type: string;
    amount: number;
    date: string;
    from: string;
    to: string;
    description: string;
  }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.transactionsDisplayed = this.transactions;
  }

  onShrinkArray(howMany: number) {
    if (howMany === 10) {
      this.transactionsDisplayed = this.transactions.slice(0, 10);
    }
    // -1 lo uso come caso limite per indicare TUTTE le transazioni
    else if (howMany === -1) {
      this.transactionsDisplayed = this.transactions;
    }
  }
}
