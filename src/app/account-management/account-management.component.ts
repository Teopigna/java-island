import { Card } from '../services/card-manage.service';

import { CardService } from './../services/card-manage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})
export class AccountManagementComponent implements OnInit {
  accounts: Card[] = [];

  showPopup: boolean = false;

  constructor(private cardService: CardService) {}
  
  ngOnInit(): void {
    this.accounts = this.cardService.arrayCards;
    this.cardService.getCards();
  }

  onAddCard() {
    this.showPopup = true;
  }

  onClosePopUp() {
    this.showPopup = false;
  }
}
