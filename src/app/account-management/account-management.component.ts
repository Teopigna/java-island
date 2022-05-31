import { Account } from './../shared/account.model';
import { Card } from '../services/card-manage.service';

import { CardService } from './../services/card-manage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})
export class AccountManagementComponent implements OnInit {
  accounts: Account[] = [];

  showPopup: boolean = false;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    
    this.cardService.getAccounts().subscribe(
      (resData: any) => {
        this.accounts = resData;
      }
    );
    
  }

  onAddCard() {
    this.showPopup = true;
  }

  onClosePopUp() {
    this.showPopup = false;
  }
}
