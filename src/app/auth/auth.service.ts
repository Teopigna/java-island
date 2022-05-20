import { User } from './../shared/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  //Subject utile ad "avvisare" i componenti che ne hanno bisogno del login/logout effettuato
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  //SignUp temporaneo su FireBase
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXV4EliA62QyHDYEvyUbpvtEvKpzG3mAI',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  //SignUp con EndPoint reale
  signUpReal(
    name: string,
    surname: string,
    email: string,
    birthDate: string,
    password: string
  ) {
    return this.http.post<AuthResponseData>(
      'https://localhost:4200/api/auth/signup',
      {
        firstName: name,
        lastName: surname,
        email: email,
        birthDate: birthDate,
        password: password,
      }
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXV4EliA62QyHDYEvyUbpvtEvKpzG3mAI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        map((resData: any) => {
          return { ...resData };
        }),
        tap((resData: any) => {
          console.log(resData);
          this.handleLogin(
            resData.access_token,
            +resData.tokenExpireIn,
            resData.refreshToken,
            +resData.refreshTokenExpireIn,
            resData.email
          );
        })
      );
  }

  handleLogin(
    tk: string,
    tkExpire: number,
    refreshTk: string,
    refreshExpire: number,
    email: string
  ) {
    const expi = tkExpire - new Date().getTime();

    const user = new User(
      'user',
      tk,
      tkExpire,
      'Gino',
      'Paoli',
      email,
      '23/09/1934'
    );

    this.user.next(user);

    this.router.navigate(['/dashboard']);
  }

  // Logout - setta la subject user a null e rimuove i dati utente dallo storage locale
  logout() {
    this.user.next(null);
    this.router.navigate(['/homepage']);
  }
}
