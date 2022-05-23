import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  // Used to manage wich panel to show: signUp or login
  login: boolean = false;
  signUp: boolean = false;

  // Used to store error message from login/signUP
  loginErrorMessage: string | null = null;

  // Default loginForm, vuoto
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  // Default signUpForm, vuoto
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  onSubmitLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe(
      (resData) => {
        this.loginErrorMessage = null;
      },
      (error: HttpErrorResponse) => {
        // Setta il messaggio di errore al messaggio ricevuto come risposta da FireBase
        this.loginErrorMessage = error.error.error.message;
      }
    );

    this.loginForm.reset();
  }

  onSubmitSignUp() {
    if (!this.signUpForm.valid) {
      return;
    }

    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const name = this.signUpForm.value.name;
    const surname = this.signUpForm.value.surname;
    const birthDate = this.signUpForm.value.birthDate;
    
    this.authService.signUpReal(name, surname, email, birthDate, password).subscribe(
      resData => {
        console.log(resData);
      },
      error => {
        console.log(error);
      }
    );

    this.signUpForm.reset();
  }

  homeMode() {
    this.login = false;
    this.signUp = false;
    this.loginErrorMessage = null;
  }

  loginMode() {
    this.login = true;
    this.signUp = false;
  }

  signUpMode() {
    this.login = false;
    this.signUp = true;
    this.loginErrorMessage = null;
  }
}
