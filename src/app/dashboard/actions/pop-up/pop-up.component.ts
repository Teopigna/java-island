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

  form1: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});
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
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.accountTransfer = this.cardService.accountsList.filter((card) => {
      return card !== this.cardService.cardDisplayed;
    });

    this.cardIsActive = this.cardService.cardDisplayed?.status;
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
      }
    } else if (this.form2.valid) {
      console.log(this.form2);

      // logica per la ricarica cellulare (toglie solo soldi, come per il prelievo)
      if (this.action === 'ricarica') {
      }
    } else {
      console.log(this.form3);

      const headerDict = {
        Authorization: this.authService.user.value!.token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

      // logica per il prelievo e il versamento: i dati aggiornati andranno poi salvati sul db(?)
      if (this.action === 'prelievo') {
        console.log(this.cardService.cardDisplayed?.accountNumber);
        console.log(-+this.form3.value.amount);

        this.http
          .post<any>(
            'http://localhost:8765/api/transactions',
            {
              accountNumber: this.cardService.cardDisplayed?.accountNumber,
              amount: -this.form3.value.amount,
            },
            requestOptions
          )
          .subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
      } else if (this.action === 'versamento') {
        this.http
          .post<any>(
            'http://localhost:8765/api/transactions',
            {
              accountNumber: this.cardService.cardDisplayed?.accountNumber,
              amount: this.form3.value.amount,
            },
            requestOptions
          )
          .subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }

    this.closeEvent();
  }
}
