import { Account } from './../../shared/account.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card-manage.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css'],
})
export class AccountCardComponent implements OnInit {
  arrayCards: Account[] = [];

  balanceDisplay: boolean = true;
  stars: string = '';

  currentIndex = 0;
  cardDisplayed: Account | undefined;

  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
      ];
      
      this.currentIndex = this.cardService.currentIndex;
      this.cardDisplayed = this.arrayCards[this.currentIndex];
      console.log("CurrentCard (account-card component): "+ this.cardDisplayed);
      
    });

    // setTimeout(() => {
    //   this.currentIndex = this.cardService.currentIndex;
    //   this.cardDisplayed = this.arrayCards[this.currentIndex];
    // }, 100);

    this.cardService.cardChanged.subscribe((card) => {
      this.cardDisplayed = card;
    });

    if (this.cardDisplayed?.status === 0) {
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

  onSeeBalance() {
    this.balanceDisplay = this.balanceDisplay ? false : true;
  }

  onRefreshCard() {
    // chiamata per vedere se il dipendente ha accettato la richiesta di creazione nuova carta
  }

  onAddCard() {
    // naviga in gestione conti
    this.router.navigate(['/gestione-conti']);
  }

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
  }

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
  }
}
