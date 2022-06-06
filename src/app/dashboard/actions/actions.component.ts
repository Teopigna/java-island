import { Account } from './../../shared/account.model';
import { CardService } from '../../services/card-manage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
})
export class ActionsComponent implements OnInit {
  popUpType: string = '';
  closedPopUp: boolean = true;

  currentCard: Account | undefined;
  cardNumber: number | undefined;

  routeSub: Subscription = new Subscription();

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentCard =
      this.cardService.accountsList[this.cardService.currentIndex];

    this.routeSub = this.route.queryParams.subscribe((params) => {
      const action = params['action'];
      const cardNumber: number = +params['card'];

      if (action) {
        this.popUpType = action;
        this.onOpenPopUp();
      }

      if (cardNumber) {
        this.currentCard = this.cardService.accountsList[cardNumber - 1];
        this.cardNumber = cardNumber;
      }
    });

    console.log(this.cardNumber);
    if (!this.cardNumber) {
      this.currentCard = this.cardService.accountsList[0];
    }
    console.log('parte action');
  }

  onClosePopUp(close: boolean) {
    this.closedPopUp = true;

    if (this.cardService.cardDisplayed?.status === 0) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { card: (this.cardService.currentIndex + 1).toString() },
        fragment: 'activated',
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { card: (this.cardService.currentIndex + 1).toString() },
      });
    }
  }

  onOpenPopUp() {
    this.closedPopUp = false;
  }
}
