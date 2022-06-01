import { CardService } from './card-manage.service';
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

  constructor(private authService: AuthService, private http: HttpClient, private cardService: CardService) {}

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
  
  //Chiamata per Bonifico/Giroconto
  doTransfer(fromIban: string, toIban: string, amount: number, cause: string){
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      "http://localhost:8765/api/transactions/transfer",
      {
        "accountNumberFrom": fromIban,
        "accountNumberTo": toIban,
        "type": 0,
        "amount": amount,
        "cause": cause
      },
      requestOptions
    ).pipe(
      tap((response) => {
        //Do something when receiving response
        //Update transaction?
        this.getTransactions().subscribe();
      })
    )
  }
}
