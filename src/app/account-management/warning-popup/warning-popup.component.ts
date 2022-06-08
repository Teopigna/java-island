import { CardService } from 'src/app/services/card-manage.service';
import { AuthService } from './../../auth/auth.service';
import { Account } from './../../shared/account.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-warning-popup',
  templateUrl: './warning-popup.component.html',
  styleUrls: ['./warning-popup.component.css']
})
export class WarningPopupComponent implements OnInit {

  @Output() onClose: EventEmitter<null> = new EventEmitter();

  constructor(private authService: AuthService, private cardService: CardService) { }

  ngOnInit(): void {
  }

  onConfirm(){
    //this.onClose.emit(null);
    this.cardService.deleteUser().subscribe(
      ((res)=> {
        console.log("Eliminazione andata a buon fine, ora fare redirecting")
      }),
      (error => {
        console.log("Errore durante l'eliminazione...riprovare più tardi")
      })
    )
  }

  onCancel(){
    this.onClose.emit(null);
  }

  onOK() {
    this.authService.logout();
  }

}
