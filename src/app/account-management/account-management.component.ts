import { BehaviorSubject } from 'rxjs';
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

  closureError: boolean = false;
  errorIndex: number = 0;

  

  constructor(private cardService: CardService) {}

  ngOnInit(): void {

    this.cardService.accountsListChanged.subscribe(
      () => {this.accounts = this.cardService.accountsList;}
    )
    
    this.cardService.getAccounts().subscribe(
      (resData: any) => {
        this.accounts = resData;
      }
    );
    
  }

  sendCloseRequest(ind: number){
    const id = this.accounts[ind].id;
    console.log(this.accounts[ind].status);

    this.cardService.closeAccount(id).subscribe(
      (resData) => {
        //console.log(resData);
      },
      (error) => {
        console.log(error.error.message);
        this.errorIndex = ind;
        this.closureError = true;
      } 
    )
  }

  onAddCard() {
    this.showPopup = true;
  }

  onClosePopUp() {
    this.showPopup = false;
  }
}
