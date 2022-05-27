import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CardService } from './../../services/card-manage.service';
import { Card } from '../../services/card-manage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-add-card-popup',
  templateUrl: './add-card-popup.component.html',
  styleUrls: ['./add-card-popup.component.css']
})
export class AddCardPopupComponent implements OnInit {

  @Output() onClose: EventEmitter<null>= new EventEmitter();

  form: FormGroup = new FormGroup({});

  accountTransfer: Card[] =
    [];

  constructor(private cardService: CardService) { }

  ngOnInit(): void {

    this.accountTransfer = this.cardService.arrayCards.filter((card) => {
      return card !== this.cardService.cardDisplayed;
    });

    this.form = new FormGroup({
      fromIban: new FormControl(null, [
        Validators.required
      ]),
      amount: new FormControl(null, [
        Validators.required,
      ])
    });
  }

  onSubmit(){

  }

  closeEvent() {
    this.onClose.emit();
  }

}
