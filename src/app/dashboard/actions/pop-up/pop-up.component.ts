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

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent implements OnInit {
  @Input() action: string = '';
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  form1: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});
  form3: FormGroup = new FormGroup({});

  accountTransfer: { saldoUtente: number; iban: string; active: boolean }[] =
    [];

  cardIsActive: boolean = false;

  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountTransfer = this.cardService.arrayCards.filter((card) => {
      return card !== this.cardService.cardDisplayed;
    });

    this.cardIsActive = this.cardService.cardDisplayed.active;
    console.log('card is active:', this.cardIsActive);

    // console.log(this.accountTransfer[0].iban);

    this.form1 = new FormGroup({
      toIban: new FormControl(null, [
        Validators.required,
        // Validators.pattern(
        //   /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/
        // ),
      ]),
      amount: new FormControl(null, [
        Validators.required,
        // Validators.pattern(/^\[0-9]+(\.[0-9][0-9])?$/),
      ]),
      // la causale non è obbligatoria
      description: new FormControl(null, [Validators.maxLength(200)]),
    });

    this.form2 = new FormGroup({
      toPhoneNumber: new FormControl(null, [
        Validators.required,
        // Validators.pattern(
        //   /^([+]39)?((3[\d]{2})([ ,\-,\/]){0,1}([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/]){0,1}([\d, ]{5,10}))$/
        // ),
      ]),
      amount: new FormControl(null, [
        Validators.required,
        // Validators.pattern(/^\[0-9]+(\.[0-9][0-9])?$/),
      ]),
      // la causale non è obbligatoria
      description: new FormControl(null, [Validators.maxLength(200)]),
    });

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
    if (this.form1.valid) {
      console.log(this.form1);

      if (this.action === 'giroconto') {
        const newBalanceFrom =
          Math.round(
            (this.cardService.cardDisplayed.saldoUtente -
              +this.form1.value.amount) *
              100
          ) / 100;

        const newBalanceTo =
          Math.round(
            (+this.cardService.arrayCards.filter((card) => {
              return card.iban === this.form1.value.toIban;
            })[0].saldoUtente +
              +this.form1.value.amount) *
              100
          ) / 100;

        if (newBalanceFrom >= 0) {
          this.cardService.cardDisplayed.saldoUtente = newBalanceFrom;

          this.cardService.arrayCards.filter((card) => {
            return card.iban === this.form1.value.toIban;
          })[0].saldoUtente = newBalanceTo;

          this.cardService.cardChanged.next({
            saldoUtente: newBalanceFrom,
            iban: this.cardService.cardDisplayed.iban,
            active: this.cardService.cardDisplayed.active,
          });
        }
      } else if (this.form2.valid) {
        console.log(this.form2);

        // logica per la ricarica cellulare (toglie solo soldi, come per il prelievo)
        if (this.action === 'ricarica') {
          const newBalance =
            Math.round(
              (this.cardService.cardDisplayed.saldoUtente -
                +this.form2.value.amount) *
                100
            ) / 100;
          if (newBalance >= 0) {
            this.cardService.cardDisplayed.saldoUtente = newBalance;
            this.cardService.cardChanged.next({
              saldoUtente: newBalance,
              iban: this.cardService.cardDisplayed.iban,
              active: this.cardService.cardDisplayed.active,
            });
          } else {
            alert(
              "L'operazione non è andata a buon fine causa saldo insufficiente sulla carta."
            );
          }
        }
      } else {
        console.log(this.form3);

        // logica per il prelievo e il versamento: i dati aggiornati andranno poi salvati sul db(?)
        if (this.action === 'prelievo') {
          const newBalance =
            Math.round(
              (this.cardService.cardDisplayed.saldoUtente -
                +this.form3.value.amount) *
                100
            ) / 100;
          if (newBalance >= 0) {
            this.cardService.cardDisplayed.saldoUtente = newBalance;
            this.cardService.cardChanged.next({
              saldoUtente: newBalance,
              iban: this.cardService.cardDisplayed.iban,
              active: this.cardService.cardDisplayed.active,
            });
          } else {
            alert(
              "L'operazione non è andata a buon fine causa saldo insufficiente sulla carta."
            );
          }
        } else if (this.action === 'versamento') {
          const newBalance =
            Math.round(
              (this.cardService.cardDisplayed.saldoUtente +
                +this.form3.value.amount) *
                100
            ) / 100;

          this.cardService.cardDisplayed.saldoUtente = newBalance;

          this.cardService.cardChanged.next({
            saldoUtente: newBalance,
            iban: this.cardService.cardDisplayed.iban,
            active: this.cardService.cardDisplayed.active,
          });
        }
      }

      this.closeEvent();
    }
  }
}
