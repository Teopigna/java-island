import { CardService } from './card-manage.service';
import { FormGroup } from '@angular/forms';
import { Account } from './../shared/account.model';
import { Transaction } from './../shared/transaction.model';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  transactions: Transaction[] = [];
  transactionsChanged = new BehaviorSubject<Transaction[]>([]);

  constructor(
    private cardService: CardService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  getTransactions(card: Account) {
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http
      .get<Transaction[]>(
        'http://localhost:8765/api/transactions/' + card.accountNumber,
        requestOptions
      )
      .pipe(
        tap((resData) => {
          this.transactions = resData;
          this.transactionsChanged.next(this.transactions);
        })
      );
  }

  postTransaction(amount: number) {
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const type = amount > 0 ? 1 : 2;

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
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
