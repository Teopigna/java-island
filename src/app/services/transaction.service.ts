import { CardService } from './card-manage.service';
import { Transaction } from './../shared/transaction.model';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  transactions: Transaction[] = [];
  transactionsChanged = new BehaviorSubject<Transaction[]>([]);

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private cardService: CardService
  ) {}

  getTransactions() {
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const cardNum = this.cardService.cardDisplayed?.accountNumber;

    return this.http
      .get<Transaction[]>(
        'http://localhost:8765/api/transactions/' + cardNum + '/-1',
        requestOptions
      )
      .pipe(
        map((resData: Transaction[]) => {
          resData.map((e: Transaction) => {
            e.date = e.date.slice(0, 10);
          });
          return resData;
        }),
        tap((resData) => {
          this.transactions = resData;
          this.transactions = this.transactions.reverse();
          this.transactionsChanged.next(this.transactions);
        })
      );
  }

  postTransaction(amount: number, type: number, phoneNumber?: number) {
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    var obj: {
      accountNumber: string;
      type: number;
      amount: number;
      cause?: string;
    } = {
      accountNumber: this.cardService.cardDisplayed.accountNumber,
      type: type,
      amount: amount,
    };

    if (type === 5) {
      const cause = 'Ricarica telefonica al numero ' + phoneNumber?.toString();

      obj = {
        accountNumber: this.cardService.cardDisplayed.accountNumber,
        type: type,
        amount: amount,
        cause: cause,
      };
    }

    return this.http
      .post<any>('http://localhost:8765/api/transactions', obj, requestOptions)
      .pipe(
        tap((res) => {
          this.cardService.getAccounts().subscribe((cardsList) => {
            cardsList = cardsList.filter((card) => {
              return card.status !== 4;
            });
            this.cardService.cardChanged.next(
              cardsList[this.cardService.currentIndex]
            );
          });
          this.getTransactions().subscribe();
        })
      );
  }

  //Chiamata per Bonifico/Giroconto
  doTransfer(
    type: number,
    fromIban: string,
    toIban: string,
    amount: number,
    cause: string
  ) {
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http
      .post(
        'http://localhost:8765/api/transactions/transfer',
        {
          accountNumberFrom: fromIban,
          accountNumberTo: toIban,
          type: type,
          amount: amount,
          cause: cause,
        },
        requestOptions
      )
      .pipe(
        tap((response) => {
          //Do something when receiving response
          //Update transaction
          this.getTransactions().subscribe();
        })
      );
  }
}
