import { CardService } from 'src/app/services/card-manage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Transaction } from './../../shared/transaction.model';
import { Component, OnInit, OnDestroy, LOCALE_ID } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  fileList: string = '';
  fileUrl: any;
  ordine: boolean = false;

  transactionsDisplayed: Transaction[] = [];

  transactionChangeSub: Subscription = new Subscription();
  addCardChangeSub: Subscription = new Subscription();

  addCard : boolean = false;

  constructor(
    private cardService: CardService,
    private transactionService: TransactionService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transactionChangeSub =
      this.transactionService.transactionsChanged.subscribe(() => {
        this.transactions = this.transactionService.transactions;
        // Mostriamo solo le ultime 10
        this.transactionsDisplayed = this.transactions.slice(0, 10);

        this.downloadList();
      });
    this.fileList = '';
    
    this.addCardChangeSub =
      this.cardService.addCard.subscribe(
        ((val) => {
          this.addCard = val;
        })
      )
  }

  onChangeTransaction(transaction: Transaction) {
    this.transactionService.currentTransactionChanged.next(transaction);
    this.router.navigate(['/transazioni', transaction.id]);
  }

  sortData(sort: Sort) {
    const data = this.transactionsDisplayed.slice();
    if (!sort.active || sort.direction == '') {
      this.transactionsDisplayed = data;
      return;
    }

    this.transactionsDisplayed = data.sort((a, b) => {
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

  downloadList() {
    this.ordine = false;
    for (let i = 0; i < this.transactionsDisplayed.length; i++) {
      let line: string = '';
      let causale: string = '';
      if (String(this.transactionsDisplayed[i].cause) == 'null') {
        causale = '/';
      } else {
        causale = String(this.transactionsDisplayed[i].cause);
      }
      line =
        'mittente:' +
        this.transactionsDisplayed[i].accountNumberFrom +
        ', destinatario:' +
        this.transactionsDisplayed[i].accountNumberTo +
        ', ammontare:' +
        this.transactionsDisplayed[i].amount +
        ', causale:' +
        causale +
        ', data:' +
        this.transactionsDisplayed[i].date +
        '\n';
      this.fileList = this.fileList + line;

      const blob = new Blob(['LISTA TRANSAZIONI \n' + this.fileList], {
        type: 'text',
      });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(blob)
      );
    }
  }

  ngOnDestroy(): void {
    this.transactionChangeSub.unsubscribe();
    this.addCardChangeSub.unsubscribe();
  }
}
