import { CardService } from './../card-manage.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css'],

  // animazione della carta da aggiungere in seguito
  // animations: [
  //   trigger('cardSlide', [
  //     state(
  //       'in',
  //       style({
  //         transform: 'translateX(0)',
  //       })
  //     ),
  //     state(
  //       'left',
  //       style({
  //         transform: 'translateX(-300px)',
  //       })
  //     ),
  //     state(
  //       'right',
  //       style({
  //         transform: 'translateX(300px)',
  //       })
  //     ),
  //     transition('left<=>in', animate(300)),
  //     transition('in<=>right', animate(300)),
  //   ]),
  // ],
})
export class AccountCardComponent implements OnInit {
  arrayCards: { saldoUtente: number; iban: string; active: boolean }[] = [];

  currentIndex = 0;
  cardDisplayed = { saldoUtente: 0, iban: '', active: false };

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.arrayCards = this.cardService.arrayCards;
    this.currentIndex = this.cardService.currentIndex;
    this.cardDisplayed = this.cardService.cardDisplayed;
  }

  onPreviousCard() {
    if (this.currentIndex - 1 >= 0) {
      this.currentIndex--;
      this.cardDisplayed = this.arrayCards[this.currentIndex];
    }
  }

  onNextCard() {
    if (this.currentIndex + 1 < this.arrayCards.length) {
      this.currentIndex++;
      this.cardDisplayed = this.arrayCards[this.currentIndex];
    }
  }
}
