import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Account } from './../shared/account.model';
import { CardService } from './../services/card-manage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})
export class AccountManagementComponent implements OnInit, OnDestroy {
  accounts: Account[] = [];
  closedAccounts: Account[] = [];

  showPopup: boolean = false;
  showWarning: boolean = false;
  showClosed: boolean = false;

  closureError: boolean = false;
  errorIndex: number = 0;

  accountListSub: Subscription = new Subscription();

  constructor(
    private cardService: CardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.accountListSub = this.cardService.accountsListChanged.subscribe(() => {
      this.accounts = this.cardService.accountsList;
      this.closedAccounts = this.accounts.filter((p) => p.status === 4);
      this.accounts = this.accounts.filter((p) => p.status != 4);
    });

    this.cardService.getAccounts().subscribe((resData: any) => {
      this.accounts = resData;
      this.closedAccounts = this.accounts.filter((p) => p.status === 4);
      this.accounts = this.accounts.filter((p) => p.status != 4);
    });
  }

  openCloseRequest(ind: number) {
    this.cardService.indexToClose = this.accounts[ind].id;

    if (this.accounts[ind].balance > 0) {
      this.errorIndex = ind;
      this.closureError = true;
    } else {
      this.closureError = false;
      this.showWarning = true;
    }
  }

  onAddCard() {
    this.showPopup = true;
  }

  onClosePopUp() {
    this.showPopup = false;
    this.closureError = false;
  }

  onCloseWarning() {
    this.showWarning = false;
  }

  onUpdate() {
    this.cardService.getAccounts().subscribe((resData: any) => {
      this.accounts = resData;
      this.closedAccounts = this.accounts.filter((p) => p.status === 4);
      this.accounts = this.accounts.filter((p) => p.status != 4);
    });
  }

  onShowClosed() {
    this.showClosed = !this.showClosed;
  }

  checkActivity(status: number): string {
    switch (status) {
      case 1: {
        return 'registrazione in attesa di conferma';
        break;
      }
      case 2: {
        return 'apertura in attesa di conferma';
        break;
      }
      case 3: {
        return 'chiusura in attesa di conferma';
        break;
      }
      case 4: {
        return 'conto chiuso';
        break;
      }
      default: {
        return 'stato sconosciuto';
        break;
      }
    }
  }

  onRefreshPage() {
    // farà la richiesta get per sapere se l'account è stato accettato

    this.cardService.getAccounts().subscribe((accountList) => {
      this.accounts = [...accountList];
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.accountListSub.unsubscribe();
  }
}
