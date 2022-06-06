import { BehaviorSubject, Subscription } from 'rxjs';
import { Account } from './../shared/account.model';
import { Card } from '../services/card-manage.service';

import { CardService } from './../services/card-manage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})
export class AccountManagementComponent implements OnInit, OnDestroy {
  accounts: Account[] = [];

  showPopup: boolean = false;
  showWarning: boolean = false;

  closureError: boolean = false;
  errorIndex: number = 0;

  accountListSub: Subscription = new Subscription();

  constructor(private cardService: CardService) {}

  ngOnInit(): void {

    this.accountListSub = this.cardService.accountsListChanged.subscribe(
      () => {
        this.accounts = this.cardService.accountsList;
        
      }
    )
    
    this.cardService.getAccounts().subscribe(
      (resData: any) => {
        this.accounts = resData;
      }
    );
    
  }

  sendCloseRequest(ind: number){

    if(this.accounts.length === 1) {
      console.log("Only one account");
      this.showWarning = true;
      return;
    }

    this.closureError = false;

    const id = this.accounts[ind].id;
    
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

  deleteAccount(ind: number){

    const id = this.accounts[ind].id;

    this.cardService.deleteAccount(id).subscribe(
      (res) => {

      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  onAddCard() {
    this.showPopup = true;
  }

  onClosePopUp() {
    this.showPopup = false;
    this.closureError = false;
  }

  onCloseWarning(){
    this.showWarning = false;
  }

  onUpdate(){
    this.cardService.getAccounts().subscribe(
      (resData: any) => {
        this.accounts = resData;
      }
    );
  }

  checkActivity(status: number) : string{
    switch(status) { 
      case 1: { 
        return "registrazione in attesa di conferma"
        break; 
      } 
      case 2: { 
        return "apertura in attesa di conferma" 
        break; 
      }
      case 3: {
        return "chiusura in attesa di conferma"
        break;
      }
      case 4: {
        return "conto chiuso: elimina"
        break;
      } 
      default: { 
         return "stato sconosciuto"
         break; 
      } 
   } 
  }

  ngOnDestroy(): void {
      this.accountListSub.unsubscribe();
  }
}
