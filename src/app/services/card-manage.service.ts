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

  //Subject che notifica i vari componenti che cambiano al cambiare dell'accountList
  accountsListChanged = new BehaviorSubject<Account[]>([]);

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
          this.accountsListChanged.next(this.accountsList);
          this.cardDisplayed = this.accountsList[this.currentIndex];
        })
      );
  }

  newAccount(
    name: string,
    surname: string,
    accountNum: string,
    amount: number
  ) {
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http
      .post<Account>(
        'http://localhost:8765/api/accounts',
        {
          firstName: name,
          lastName: surname,
          accountNumber: accountNum,
          amount: amount,
        },
        requestOptions
      )
      .pipe(
        tap((resData: Account) => {
          //Quando si apre un nuovo conto, vanno aggiornati gli array contenenti i conti dell'utente loggato
          this.getAccounts().subscribe((resData) => {
            this.accountsList = resData;
            //Subject che notifica i vari componenti che cambiano al cambiare dell'accountList
            this.accountsListChanged.next(this.accountsList);
          });
        })
      );
  }

  closeAccount(id: number) {
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http
      .put(
        'http://localhost:8765/api/accounts/' + id,
        {
          account_id: id,
        },
        requestOptions
      )
      .pipe(
        tap((resData) => {
          //Quando si chiude un conto, vanno aggiornati gli array contenenti i conti dell'utente loggato
          this.getAccounts().subscribe((resData) => {
            this.accountsList = resData;
            //Subject che notifica i vari componenti che cambiano al cambiare dell'accountList
            this.accountsListChanged.next(this.accountsList);
          });
        })
      );
  }

  deleteAccount(id:number){
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    
    return this.http
      .delete(
        'http://localhost:8765/api/accounts/intern/delete/'+id,
        requestOptions
      ).pipe(
        tap((resData) => {
          //Quando si elimina un conto, vanno aggiornati gli array contenenti i conti dell'utente loggato
          this.getAccounts().subscribe(
            (resData) => {
              this.accountsList = resData;
              //Subject che notifica i vari componenti che cambiano al cambiare dell'accountList
              this.accountsListChanged.next(this.accountsList);
            }
          )
        })
      );
  }

  deleteUser(){
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.delete(
      "http://localhost:8765/api/account_owners",
      requestOptions
    )
  }
}
