import { CardService } from './../../services/card-manage.service';
import { Transaction } from './../../shared/transaction.model';
import { Subscription } from 'rxjs';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
