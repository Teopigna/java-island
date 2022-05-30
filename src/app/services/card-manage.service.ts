import { Account } from './../shared/account.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Card {
  saldoUtente: number;
  iban: string;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class CardService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  cardChanged = new BehaviorSubject<Account>({
    id: 0,
    accountNumber: '',
    firstName: '',
    lastName: '',
    balance: 0,
    status: 0,
    accountOwnerId: 0,
  });

  accountsList: Account[] = [];

  currentIndex = 0;
  cardDisplayed = this.accountsList[this.currentIndex];

  getAccounts() {
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http
      .get<Account[]>('http://localhost:8765/api/accounts', requestOptions)
      .pipe(
        tap((resData) => {
          this.accountsList = resData;
        })
      );
  }
}
