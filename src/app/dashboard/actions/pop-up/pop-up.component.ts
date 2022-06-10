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

  //Da settare true in caso ci sia un errore durante versamento / prelievo
  showError: boolean = false;
  errorMessage: string = '';

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
    this.cardIsActive = this.cardService.cardDisplayed?.status;

    this.form3 = new FormGroup({
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(0.1),
        Validators.max(100000)
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
      // logica per il prelievo e il versamento: i dati aggiornati andranno poi salvati sul db(?)
      if (this.action === 'prelievo') {
        this.traService.postTransaction(-this.form3.value.amount, 3).subscribe(
          (response) => {
            this.showError = false;
            this.errorMessage = '';
            this.closeEvent();
          },
          (error) => {
            this.showError = true;
            this.errorMessage = error.error.message;
          }
        );
      } else if (this.action === 'versamento') {
        this.traService.postTransaction(this.form3.value.amount, 2).subscribe(
          (response) => {
            this.showError = false;
            this.errorMessage = '';
            this.closeEvent();
          },
          (error) => {
            this.showError = true;
            this.errorMessage = error.error.message;
          }
        );
      }
    }
  }
}
