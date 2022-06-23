import { Account } from './../shared/account.model';
import { CardService } from './../services/card-manage.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  name?: string;
  surname?: string;
  email?: string;
  birthDate?: string;

  cardArray: Account[] = [];

  constructor(
    private authService: AuthService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.name = this.authService.user.value?.name;
    this.surname = this.authService.user.value?.surname;
    this.email = this.authService.user.value?.email;
    this.birthDate = this.authService.user.value?.birthDate;

    this.cardService.getAccounts().subscribe((accountList) => {
      this.cardArray = [...accountList];
    });
  }

  onRefreshPage() {
    // farà la richiesta get per sapere se l'account è stato accettato

    this.cardService.getAccounts().subscribe((accountList) => {
      this.cardArray = [...accountList];
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
