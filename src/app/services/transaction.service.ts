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

  constructor(private authService: AuthService, private http: HttpClient) {}

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
}
