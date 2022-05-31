import { Account } from './../shared/account.model';
import { AuthService } from './../auth/auth.service';
import { CardService } from '../services/card-manage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // per prendere activeUser si userà poi lo stesso metodo nella pagina profile
  activeUser: string | undefined;
  // per controllare se l'utente è in attesa della richiesta di registrazione bisogna controllare se ha un'unica carta e questa è inattiva
  cardArray: Account[] = [];

  constructor(
    private cardService: CardService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.cardService.getAccounts().subscribe((accountList) => {
      this.cardArray = [
        ...accountList
      ];
      
      console.log("CurrentCard (dashboard component): "+ this.cardArray);
      
    });

    this.activeUser = this.authService.user.value?.name;
  }

  onRefreshPage() {
    // farà la richiesta get per sapere se l'account è stato accettato
  }
}
