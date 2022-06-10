import { CardService } from 'src/app/services/card-manage.service';
import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-warning-popup',
  templateUrl: './warning-popup.component.html',
  styleUrls: ['./warning-popup.component.css'],
})
export class WarningPopupComponent implements OnInit {
  @Output() onClose: EventEmitter<null> = new EventEmitter();

  indexToClose?: number;

  requestError = false;

  constructor(
    private authService: AuthService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.indexToClose = this.cardService.indexToClose;
  }

  sendCloseRequest() {
    const id = this.cardService.indexToClose;

    this.cardService.closeAccount(id).subscribe(
      (resData) => {},
      (error) => {
        this.requestError = true;
      }
    );
  }

  onCancel() {
    this.onClose.emit(null);
  }

  onOK() {
    //this.authService.logout();
    this.onClose.emit(null);
  }
}
