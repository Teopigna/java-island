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

    this.closureError = false;

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
    this.closureError = false;
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
        return "conto prossimo alla chiusura"
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
