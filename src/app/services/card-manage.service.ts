import { Account } from './../shared/account.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Card {
  saldoUtente: number;
  iban: string;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class CardService {

  constructor(private authService: AuthService, private http: HttpClient){}

  cardChanged = new BehaviorSubject<Card>({
    saldoUtente: 237.54,
    iban: 'IT60X0542811101000000123456',
    active: true,
  });

  arrayCards = [
    {
      saldoUtente: 237.54,
      iban: 'IT60X0542811101000000123456',
      active: true,
    },
    {
      saldoUtente: 2370.54,
      iban: 'IT60X0542811101000000145656',
      active: false,
    },
    {
      saldoUtente: 1137.54,
      iban: 'IT60X0542811101000000199396',
      active: true,
    },
  ];

  accountsList: Account[] = []

  currentIndex = 0;
  cardDisplayed = this.arrayCards[this.currentIndex];
  
  getCards(){

    //Preparo l'header Authorization, che contiene il token dell'utente
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http
      .get<Account>(
        'http://localhost:8765/api/accounts',
        requestOptions
      )
      .subscribe(
        (resData: any) => {
          this.accountsList = resData;
          console.log(this.accountsList);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
