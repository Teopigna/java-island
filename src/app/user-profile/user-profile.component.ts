import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name?: string;
  surname?: string;
  email?: string;
  birthDate?: string;

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.name = this.authService.user.value?.name;
    this.surname = this.authService.user.value?.surname;
    this.email = this.authService.user.value?.email;
    this.birthDate = this.authService.user.value?.birthDate;
  }

}
