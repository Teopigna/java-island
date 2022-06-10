import { Observable } from 'rxjs';
import { TransactionService } from 'src/app/services/transaction.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CardService } from 'src/app/services/card-manage.service';
import { Account } from 'src/app/shared/account.model';
import { StepperOrientation } from '@angular/cdk/stepper';

@Component({
  selector: 'app-no-popup-actions',
  templateUrl: './no-popup-actions.component.html',
  styleUrls: ['./no-popup-actions.component.css'],
})
export class NoPopupActionsComponent implements OnInit {
  action: string = '';
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  isLinear: boolean = true;

  form1: FormGroup = new FormGroup({});

  accountTransfer: Account[] = [];

  cardIsActive: number = 1;
  // 0: conto attivo
  // 1: primo conto da attivare
  // 2: conto non primo da attivare
  // 3: conto da chiudere
  // 4: conto non validato

  orientation: StepperOrientation = 'horizontal';

  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private cardService: CardService,
    private traService: TransactionService,
    private router: Router,
    private location: Location
  ) {
    this.onResize();
  }

  ngOnInit(): void {
    this.accountTransfer = this.cardService.accountsList.filter((card) => {
      return card !== this.cardService.cardDisplayed && card.status === 0;
    });

    //raccogliere action dall'url
    this.action = [...this.router.url]
      .filter((char) => {
        return char !== '/';
      })
      .join('');

    this.cardIsActive = this.cardService.cardDisplayed?.status;
    
    if(this.action === 'ricarica'){
      this.form1 = new FormGroup({
        to: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.min(0.1),
          Validators.max(100000),
        ]),
        // la causale non è obbligatoria
        description: new FormControl(null, [Validators.maxLength(200)]),
      });
    }
    else {
      this.form1 = new FormGroup({
        to: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.min(0.1),
          Validators.max(100000),
        ]),
        // la causale non è obbligatoria
        description: new FormControl(null, [Validators.maxLength(200)]),
      });
    }

    

    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (window.innerWidth <= 767) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }
  }

  onSubmit() {
    let type: number = 0;

    if (this.action === 'bonifico') {
      type = 1;
    } else if (this.action === 'giroconto') {
      type = 4;
    } else if (this.action === 'ricarica') {
      type = 5; //sono un prelievo...
    }

    if (type === 1 || type === 4) {
      this.traService
        .doTransfer(
          type,
          this.cardService.cardDisplayed.accountNumber,
          this.form1.value.to,
          this.form1.value.amount,
          this.form1.value.description
        )
        .subscribe(
          (response) => {
            this.errorMessage = '';
            this.showError = false;
          },
          (error) => {
            this.errorMessage = error.error.message;
            this.showError = true;
          }
        );
    } else if (type === 5) {
      this.traService
        .postTransaction(-this.form1.value.amount, type, this.form1.value.to)
        .subscribe(
          (response) => {
            this.errorMessage = '';
            this.showError = false;
          },
          (error) => {
            this.errorMessage = error.error.message;
            this.showError = true;
          }
        );
    }
  }

  onNavigate() {
    this.router.navigate(['dashboard'], {
      queryParams: { card: (this.cardService.currentIndex + 1).toString() },
      fragment: 'activated',
    });
  }
}
