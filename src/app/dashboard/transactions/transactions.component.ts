import { Transaction } from './../../shared/transaction.model';
import { CardService } from '../../services/card-manage.service';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  transactionsDisplayed: Transaction[] = [];

  constructor(private traService: TransactionService) {}

  ngOnInit(): void {
    this.transactions = this.traService.transactions;

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
