import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card-manage.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css'],
})
export class AccountCardComponent implements OnInit {
  arrayCards: { saldoUtente: number; iban: string; active: boolean }[] = [];

  balanceDisplay: boolean = true;
  stars: string = '';

  currentIndex = 0;
  cardDisplayed = { saldoUtente: 0, iban: '', active: false };

  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.arrayCards = [
      ...this.cardService.arrayCards,
      {
        saldoUtente: 0,
        iban: '',
        active: true,
      },
    ];

    console.log(this.cardService.arrayCards);

    this.currentIndex = this.cardService.currentIndex;
    this.cardDisplayed = this.cardService.cardDisplayed;

    this.cardService.cardChanged.subscribe((card) => {
      this.cardDisplayed = card;
    });

    if (this.cardDisplayed.active) {
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
        this.cardService.arrayCards[this.cardService.currentIndex];

      if (this.cardDisplayed.active && this.cardDisplayed.iban !== '') {
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
        this.cardService.arrayCards[this.cardService.currentIndex];

      if (this.cardDisplayed.active && this.cardDisplayed.iban !== '') {
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
