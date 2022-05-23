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
    return this.http.post('https://localhost:8765/api/auth/signup', {
      firstName: name,
      lastName: surname,
      email: email,
      birthDate: birthDate,
      password: password,
    });
  }
  //Login temporaneo su FireBase
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

  //Login con EndPoint reale
  loginReal(email: string, password: string) {
    return this.http.post('https://localhost:8765/api/auth/signin', {
      email: email,
      password: password,
    });
  }

  // Login handling temporaneo con firebase
  handleLogin(
    tk: string,
    tkExpire: number,
    refreshTk: string,
    refreshExpire: number,
    email: string
  ) {
    const user = new User(
      'user',
      tk,
      tkExpire,
      'Gino',
      'Paoli',
      email,
      '23/09/1934',
      'D'
    );

    this.user.next(user);

    //Salva l'utente nel localStorage per la funzione di AutoLogin
    localStorage.setItem('user', JSON.stringify(user));

    this.router.navigate(['/dipendente']);
  }

  handleLoginReal() {
    // Per gestire la risposta della richiesta di login e storare token e info dell'utente nell'oggetto User
  }

  // Recupera i dati relativi all'utente dal local storage quando la pagina viene refreshata
  autoLogin() {
    const userData: {
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      name: string;
      surname: string;
      email: string;
      birthDate: string;
      role: string;
    } = JSON.parse(localStorage.getItem('user') || '{}');

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData._token,
      +userData._tokenExpirationDate,
      userData.name,
      userData.surname,
      userData.email,
      userData.birthDate,
      userData.role
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.router.navigate(['/dashbooard']);
    }
  }

  // Logout - setta la subject user a null e rimuove i dati utente dallo storage locale
  logout() {
    this.user.next(null);
    this.router.navigate(['/homepage']);
  }
}
