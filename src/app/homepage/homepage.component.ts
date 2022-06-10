import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { skip } from 'rxjs';

export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value
    ? null
    : { notmatched: true };
};

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
  signUpErrorMessage: string | null = null;

  // Default loginForm, vuoto
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  // Default signUpForm, vuoto
  signUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      surname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchingValidatior }
  );

  constructor(
    private authService: AuthService,
    private dateFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {}

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
      (error) => {
        this.loginErrorMessage = error.error.message;
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
    const birthDate = this.dateFormatter.format(
      this.signUpForm.value.birthDate
    );

    this.authService
      .signUp(name, surname, email, birthDate, password)
      .subscribe(
        (resData) => {
          this.signUpForm.reset();
          // Se la registrazione è avvenuta con successo (no messaggi d'errore), lancia il login
          setTimeout(() => {
            this.redirectToLogin(email, password);
          }, 100);
        },
        (error) => {
          this.signUpErrorMessage = error.error.message;
        }
      );
  }

  redirectToLogin(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      (resData) => {
        this.loginErrorMessage = null;
      },
      (error) => {
        this.loginErrorMessage = error.error.message;
      }
    );
  }

  homeMode() {
    this.login = false;
    this.signUp = false;
    this.loginErrorMessage = null;
    this.signUpErrorMessage = null;
  }

  loginMode() {
    this.login = true;
    this.signUp = false;
    this.signUpErrorMessage = null;
  }

  signUpMode() {
    this.login = false;
    this.signUp = true;
    this.loginErrorMessage = null;
  }
}
