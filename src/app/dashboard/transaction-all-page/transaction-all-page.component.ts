import { Account } from './../../shared/account.model';
import { CardService } from './../../services/card-manage.service';
import { Transaction } from './../../shared/transaction.model';
import { Subscription } from 'rxjs';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-transaction-all-page',
  templateUrl: './transaction-all-page.component.html',
  styleUrls: ['./transaction-all-page.component.css'],
})
export class TransactionAllPageComponent implements OnInit, OnDestroy {
  transactionChangeSub: Subscription = new Subscription();
  transactions: Transaction[] = [];

  card: Account | undefined;

  fileList: string = '';
  downloadFileUrl: any;

  constructor(
    private transactionService: TransactionService,
    private cardService: CardService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cardService.getAccounts().subscribe((cards) => {
      this.cardService.accountsList = [...cards];
      this.cardService.cardDisplayed = cards[this.cardService.currentIndex];

      this.card = this.cardService.cardDisplayed;

      this.transactionService.getTransactions().subscribe((traList) => {
        this.transactions = traList;
        this.downloadList();
      });
    });
  }

  downloadList() {
    for (let i = 0; i < this.transactions.length; i++) {
      let line: string = '';
      let causale: string = '';
      if (String(this.transactions[i].cause) == 'null') {
        causale = '/';
      } else {
        causale = String(this.transactions[i].cause);
      }
      line =
        'mittente:' +
        this.transactions[i].accountNumberFrom +
        ', destinatario:' +
        this.transactions[i].accountNumberTo +
        ', ammontare:' +
        this.transactions[i].amount +
        ', causale:' +
        causale +
        ', data:' +
        this.transactions[i].date +
        '\n';
      this.fileList = this.fileList + line;
      console.log(this.fileList);

      const blob = new Blob(['LISTA TRANSAZIONI \n' + this.fileList], {
        type: '.txt',
      });
      this.downloadFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(blob)
      );
    }
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
        case 'date':
          return this.compare(a.date, b.date, isAsc);
        case 'amount':
          return this.compare(+a.amount, +b.amount, isAsc);
        case 'type':
          return this.compare(+a.type!, +b.type!, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onChangeTransaction(transaction: Transaction) {
    this.transactionService.currentTransactionChanged.next(transaction);
  }

  ngOnDestroy(): void {
    this.transactionChangeSub.unsubscribe();
  }
}
