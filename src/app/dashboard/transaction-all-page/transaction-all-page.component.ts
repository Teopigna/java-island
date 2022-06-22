import { Account } from './../../shared/account.model';
import { CardService } from './../../services/card-manage.service';
import { Transaction } from './../../shared/transaction.model';
import { from, Subscription } from 'rxjs';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction-all-page',
  templateUrl: './transaction-all-page.component.html',
  styleUrls: ['./transaction-all-page.component.css'],
})
export class TransactionAllPageComponent implements OnInit, OnDestroy {
  transactionChangeSub: Subscription = new Subscription();
  transactions: Transaction[] = [];
  transactionsDisplayed: Transaction[] = [];

  card: Account | undefined;

  fileList: string = '';
  downloadFileUrl: any;

  // Date filter
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  showCalendar: boolean = false;

  causeValue: string = '';
  ibanValue: string = '';

  constructor(
    private transactionService: TransactionService,
    private cardService: CardService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cardService.getAccounts().subscribe(() => {
      
      this.card = this.cardService.cardDisplayed;

      this.transactionService.getTransactions().subscribe((traList) => {
        this.transactions = traList;
        this.transactionsDisplayed = this.transactions;
        this.transactionsDisplayed.reverse();
        this.downloadList();
      });
    });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  getDate(date: NgbDate): string {
    //return date.day + '/' + date.month + '/' + date.year
    let d = '';
    let m = '';

    if (date.day < 10) {
      d = '0';
    }

    if (date.month < 10) {
      m = '0';
    }
    return date.year + '-' + m + date.month + '-' + d + date.day;
  }

  getDate2(date: string): string {
    return date.slice(0, 10);
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  onShow() {
    this.showCalendar = !this.showCalendar;
  }

  filter(type: string) {
    switch (type) {
      case 'date':
        if (this.fromDate != null && this.toDate != null) {
          let fromD = this.getDate(this.fromDate);
          let toD = this.getDate(this.toDate);

          let dFrom = Date.parse(fromD);
          let dTo = Date.parse(toD);

          this.transactionsDisplayed = this.transactions.filter((item: any) => {
            // if (
            //   Date.parse(this.getDate2(item.date)) <= dTo &&
            //   Date.parse(this.getDate2(item.date)) >= dFrom
            // ) {
            //   console.log('Ha senso');
            // }

            return (
              Date.parse(this.getDate2(item.date)) <= dTo &&
              Date.parse(this.getDate2(item.date)) >= dFrom
            );
          });
          break;
        } else {
          this.transactionsDisplayed = this.transactions;
          break;
        }
      case 'cause':
        if (this.causeValue === '') {
          this.transactionsDisplayed = this.transactions;
        } else {
          this.transactionsDisplayed = [];
          for (let item of this.transactions) {
            if (
              item.cause?.toLowerCase().includes(this.causeValue.toLowerCase())
            ) {
              this.transactionsDisplayed.push(item);
            }
          }
        }

        break;

      case 'iban':
        if (this.ibanValue === '') {
          this.transactionsDisplayed = this.transactions;
        } else {
          this.transactionsDisplayed = [];
          for (let item of this.transactions) {
            if (
              item.accountNumberFrom
                ?.toLowerCase()
                .includes(this.ibanValue.toLowerCase()) ||
              item.accountNumberTo
                ?.toLowerCase()
                .includes(this.ibanValue.toLowerCase())
            ) {
              this.transactionsDisplayed.push(item);
            }
          }
        }

        break;
    }
  }

  onCancelSearch() {
    this.causeValue = '';
    this.ibanValue = '';
  }

  showAll() {
    this.transactionsDisplayed = this.transactions;
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
      

      const blob = new Blob(['LISTA TRANSAZIONI \n' + this.fileList], {
        type: '.txt',
      });
      this.downloadFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(blob)
      );
    }
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

  onChangeTransaction(transaction: Transaction) {
    this.transactionService.currentTransactionChanged.next(transaction);
  }

  ngOnDestroy(): void {
    this.transactionChangeSub.unsubscribe();
  }
}
