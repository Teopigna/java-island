import { TransactionService } from 'src/app/services/transaction.service';
import { AuthService } from './../../../auth/auth.service';
import { Account } from './../../../shared/account.model';
import { CardService } from '../../../services/card-manage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent implements OnInit {
  @Input() action: string = '';
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  form3: FormGroup = new FormGroup({});

  accountTransfer: Account[] = [];

  cardIsActive: number = 1;
  // 0: conto attivo
  // 1: primo conto da attivare
  // 2: conto non primo da attivare
  // 3: conto da chiudere
  // 4: conto non validato

  constructor(
    private cardService: CardService,
    private traService: TransactionService
  ) {}

  ngOnInit(): void {
    this.accountTransfer = this.cardService.accountsList.filter((card) => {
      return card !== this.cardService.cardDisplayed;
    });

    this.cardIsActive = this.cardService.cardDisplayed?.status;
    console.log('card is active:', this.cardIsActive);
    console.log('current card index: ' + this.cardService.currentIndex);

    // console.log(this.accountTransfer[0].iban);

    this.form3 = new FormGroup({
      amount: new FormControl(null, [
        Validators.required,
        // Validators.pattern(/^\[0-9]+(\.[0-9][0-9])?$/),
      ]),
    });
  }

  closeEvent() {
    this.onClose.emit(true);
  }

  onSubmit() {
    // da implementare il bonifico
    if (this.form3.valid) {
      console.log(this.form3);

      // logica per il prelievo e il versamento: i dati aggiornati andranno poi salvati sul db(?)
      if (this.action === 'prelievo') {
        // console.log(this.cardService.cardDisplayed?.accountNumber);
        // console.log(-+this.form3.value.amount);

        this.traService.postTransaction(this.form3.value.amount, 3);
      } else if (this.action === 'versamento') {
        this.traService.postTransaction(this.form3.value.amount, 2);
      }
    }

    this.closeEvent();
  }
}
