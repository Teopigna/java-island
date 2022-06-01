import { AuthService } from './../../auth/auth.service';
import { Account } from './../../shared/account.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CardService } from './../../services/card-manage.service';
import { Card } from '../../services/card-manage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-card-popup',
  templateUrl: './add-card-popup.component.html',
  styleUrls: ['./add-card-popup.component.css'],
})
export class AddCardPopupComponent implements OnInit {

  @Output() onClose: EventEmitter<Account[] | null> = new EventEmitter();

  form: FormGroup = new FormGroup({});

  accountTransfer: Account[] =
    [];

  
  constructor(private cardService: CardService, private authService: AuthService) { }

  ngOnInit(): void {

    this.accountTransfer = this.cardService.accountsList;
    this.accountTransfer= this.accountTransfer.filter(i => i.status === 0);

    this.form = new FormGroup({
      fromIban: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(0.1)]),
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const fromIban = this.form.value.fromIban;
    const amount = this.form.value.amount;

    console.log('Richiesta apertura nuovo conto...');
    console.log(
      'Prelevando ' +
        amount +
        '$ dal conto ' +
        fromIban +
        ' per la creazione di un nuovo conto'
    );



    // **** Fare qui chiamata a servizio che si occupa di inviare la POST a: /api/accounts  
    // **** indicando fromIban, la somma, il nome ed il cognome

    this.cardService.newAccount(this.authService.user.value!.name, this.authService.user.value!.surname, fromIban, amount )
      .subscribe((resData) => {
        console.log(resData);
      });
    

    this.form.reset();
    this.closeEvent();
  }

  closeEvent() {
    this.onClose.emit();
  }
}
