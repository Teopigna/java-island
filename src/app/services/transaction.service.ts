import { CardService } from './card-manage.service';
import { FormGroup } from '@angular/forms';
import { Account } from './../shared/account.model';
import { Transaction } from './../shared/transaction.model';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, tap } from 'rxjs';

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

    const cardNum = this.cardService.cardDisplayed.accountNumber;

    return this.http
      .get<Transaction[]>(
        'http://localhost:8765/api/transactions/' + cardNum,
        requestOptions
      )
      .pipe(
        tap((resData) => {
          this.transactions = resData;
          this.transactionsChanged.next(this.transactions);
        })
      );
  }

  postTransaction(amount: number, type: number) {
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http
      .post<any>(
        'http://localhost:8765/api/transactions',
        {
          accountNumber: this.cardService.cardDisplayed.accountNumber,
          type: type,
          amount: amount,
        },
        requestOptions
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.cardService.getAccounts().subscribe((cardsList) => {
            this.cardService.cardChanged.next(
              cardsList[this.cardService.currentIndex]
            );
          });
          this.getTransactions().subscribe();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //Chiamata per Bonifico/Giroconto
  doTransfer(fromIban: string, toIban: string, amount: number, cause: string) {
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
          type: 0,
          amount: amount,
          cause: cause,
        },
        requestOptions
      )
      .pipe(
        tap((response) => {
          //Do something when receiving response
          //Update transaction?
          this.getTransactions().subscribe();
        })
      );
  }
}
