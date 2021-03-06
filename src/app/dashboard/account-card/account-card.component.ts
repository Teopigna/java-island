import { TransactionService } from 'src/app/services/transaction.service';
import { Subscription } from 'rxjs';
import { Account } from './../../shared/account.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card-manage.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css'],
})
export class AccountCardComponent implements OnInit, OnDestroy {
  arrayCards: Account[] = [];

  balanceDisplay: boolean = true;
  stars: string = '';

  currentIndex = 0;
  cardDisplayed: Account | undefined;

  cardChangeSub: Subscription = new Subscription();
  accountsChangeSub: Subscription = new Subscription();

  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute,
    private transService: TransactionService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.accountsChangeSub = this.cardService.accountsListChanged.subscribe(
      () => {
        this.arrayCards = [
          ...this.cardService.accountsList,
          {
            id: 0,
            accountNumber: '',
            firstName: '',
            lastName: '',
            balance: 0,
            status: 0,
            accountOwnerId: 0,
          },
        ].filter((card) => {
          return card.status !== 4;
        });
        this.cardDisplayed = this.arrayCards[this.currentIndex];
      }
    );

    //Inizializza arrayCards
    this.cardService.getAccounts().subscribe((accountList) => {
      this.arrayCards = [
        ...accountList,
        {
          id: 0,
          accountNumber: '',
          firstName: '',
          lastName: '',
          balance: 0,
          status: 0,
          accountOwnerId: 0,
        },
      ].filter((card) => {
        return card.status !== 4;
      });
      //Setta la carta attuale
      this.currentIndex = this.cardService.currentIndex;
      this.cardDisplayed = this.arrayCards[this.currentIndex];
      //Setta le transazioni rispetto alla carta mostrata
      this.transService.getTransactions().subscribe((trList) => {});
    });

    this.cardChangeSub = this.cardService.cardChanged.subscribe((card) => {
      this.cardDisplayed = card;
    });

    if (this.cardDisplayed?.status === 0) {
      this.currentIndex = this.cardService.currentIndex;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { card: (this.currentIndex + 1).toString() },
        fragment: 'activated',
      });
    } else {
      this.currentIndex = this.cardService.currentIndex;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { card: (this.currentIndex + 1).toString() },
      });
    }
  }

  onCopy() {
    this.clipboard.copy(this.cardDisplayed!.accountNumber);
  }

  // Toggle per mostrare o nascondere il saldo
  onSeeBalance() {
    this.balanceDisplay = this.balanceDisplay ? false : true;
  }

  // Chiamata per vedere se il dipendente ha accettato la richiesta di creazione nuova carta
  onRefreshCard() {
    this.cardService.getAccounts().subscribe((accountList) => {
      // Set new accountList
      this.arrayCards = [
        ...accountList,
        {
          id: 0,
          accountNumber: '',
          firstName: '',
          lastName: '',
          balance: 0,
          status: 0,
          accountOwnerId: 0,
        },
      ].filter((card) => {
        return card.status !== 4;
      });

      //Refresh Card HERE
      this.cardDisplayed = this.arrayCards[this.currentIndex];

      if (
        this.cardDisplayed.status === 0 &&
        this.cardDisplayed.accountNumber !== ''
      ) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { card: (this.currentIndex + 1).toString() },
          fragment: 'activated',
        });
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { card: (this.currentIndex + 1).toString() },
        });
      }
      //Update transactions on refresh
      this.transService.getTransactions().subscribe((trList) => {});
    });
    this.checkCard();
  }
  // Naviga in gestione conti al click di aggiungi carta
  onAddCard() {
    this.router.navigate(['/gestione-conti']);
  }
  // Aggiorna la carta mostrata al click della freccia sinistra
  onPreviousCard() {
    if (this.currentIndex - 1 >= 0) {
      this.currentIndex--;
      this.cardDisplayed = this.arrayCards[this.currentIndex];

      this.cardService.currentIndex--;
      this.cardService.cardDisplayed =
        this.cardService.accountsList[this.cardService.currentIndex];

      if (
        this.cardDisplayed.status === 0 &&
        this.cardDisplayed.accountNumber !== ''
      ) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { card: (this.currentIndex + 1).toString() },
          fragment: 'activated',
        });
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { card: (this.currentIndex + 1).toString() },
        });
      }
    }
    //Update transactions when changhing card
    this.transService.getTransactions().subscribe((trList) => {});
    this.checkCard();
  }

  // Aggiorna la carta mostrata al click della freccia destra
  onNextCard() {
    if (this.currentIndex + 1 < this.arrayCards.length) {
      this.currentIndex++;
      this.cardDisplayed = this.arrayCards[this.currentIndex];

      this.cardService.currentIndex++;
      this.cardService.cardDisplayed =
        this.cardService.accountsList[this.cardService.currentIndex];

      if (
        this.cardDisplayed.status === 0 &&
        this.cardDisplayed.accountNumber !== ''
      ) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { card: (this.currentIndex + 1).toString() },
          fragment: 'activated',
        });
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { card: (this.currentIndex + 1).toString() },
        });
      }
    }

    //Update transactions when changhing card
    this.transService.getTransactions().subscribe((trList) => {});
    this.checkCard();
  }

  ngOnDestroy(): void {
    this.cardChangeSub.unsubscribe();
    this.accountsChangeSub.unsubscribe();
  }

  checkCard() {
    if (this.cardDisplayed?.accountNumber === '') {
      this.cardService.setAddCard(true);
    } else {
      this.cardService.setAddCard(false);
    }
  }
}
