import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CardService } from 'src/app/services/card-manage.service';
import { Account } from 'src/app/shared/account.model';

@Component({
  selector: 'app-no-popup-actions',
  templateUrl: './no-popup-actions.component.html',
  styleUrls: ['./no-popup-actions.component.css'],
})
export class NoPopupActionsComponent implements OnInit {
  @Input() action: string = '';
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  isLinear: boolean = true;

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
    console.log('current card index: ' + this.cardService.currentIndex);
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
  }

  onSubmit() {}
}
