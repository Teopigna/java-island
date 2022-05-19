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
      description: 'descrizione della transazione',
    },
    {
      id: 1,
      type: 'versamento',
      amount: 3,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: 'descrizione della transazione',
    },
    {
      id: 1,
      type: 'versamento',
      amount: 27.99,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: 'descrizione della transazione',
    },
    {
      id: 1,
      type: 'giroconto',
      amount: 100,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: 'descrizione della transazione',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40.92,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: 'descrizione della transazione',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 234,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: 'descrizione della transazione',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: 'descrizione della transazione',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: 'descrizione della transazione',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: 'descrizione della transazione',
    },
    {
      id: 1,
      type: 'bonifico',
      amount: 40,
      date: '27-09-2021',
      from: 'contoxxx',
      to: 'contoyyy',
      description: 'descrizione della transazione',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
