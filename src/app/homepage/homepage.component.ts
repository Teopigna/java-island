import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  login: boolean = false;
  signUp: boolean = false;

  // Default loginForm, vuoto
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  // Default signUpForm, vuoto
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitLogin(){

  }

  onSubmitSignUp(){

  }

  homeMode(){
    this.login = false;
    this.signUp = false;
  }

  loginMode(){
    this.login = true;
    this.signUp = false;
  }

  signUpMode(){
    this.login = false;
    this.signUp = true;
  }

}
