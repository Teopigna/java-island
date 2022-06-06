import { Account } from './../../shared/account.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-warning-popup',
  templateUrl: './warning-popup.component.html',
  styleUrls: ['./warning-popup.component.css']
})
export class WarningPopupComponent implements OnInit {

  @Output() onClose: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onConfirm(){
    this.onClose.emit(null);
  }

  onCancel(){
    this.onClose.emit(null);
  }

}
