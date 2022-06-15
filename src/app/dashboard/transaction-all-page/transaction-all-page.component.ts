import { CardService } from './../../services/card-manage.service';
import { Transaction } from './../../shared/transaction.model';
import { Subscription } from 'rxjs';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-transaction-all-page',
  templateUrl: './transaction-all-page.component.html',
  styleUrls: ['./transaction-all-page.component.css'],
})
export class TransactionAllPageComponent implements OnInit, OnDestroy {
  transactionChangeSub: Subscription = new Subscription();
  transactions: Transaction[] = [];
  ordine: boolean = false;

  constructor(
    private transactionService: TransactionService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.cardService.getAccounts().subscribe((cards) => {
      this.cardService.accountsList = [...cards];
      this.cardService.cardDisplayed = cards[this.cardService.currentIndex];
      this.transactionService.getTransactions().subscribe((traList) => {
        this.transactions = traList;
      });
    });
  }

  sortData(sort: Sort) {
    const data = this.transactions.slice();
    if (!sort.active || sort.direction == '') {
      this.transactions = data;
      return;
    }

    this.transactions = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'date': return this.compare(a.date, b.date, isAsc);
        case 'amount': return this.compare(+a.amount, +b.amount, isAsc);
        case 'type': return this.compare(+a.type!, +b.type!, isAsc);
        default: return 0;
      }
    });
  }

  compare(a:  number | string, b:  number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onReverse() {
    this.transactions.reverse();
    this.ordine = !this.ordine;
  }

  onChangeTransaction(transaction: Transaction) {
    this.transactionService.currentTransactionChanged.next(transaction);
  }

  ngOnDestroy(): void {
    this.transactionChangeSub.unsubscribe();
  }
}
