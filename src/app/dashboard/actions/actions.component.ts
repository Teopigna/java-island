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

  currentCard: Account = this.cardService.cardDisplayed;

  routeSub: Subscription = new Subscription();

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      const action = params['action'];
      const cardNumber = +params['card'];
      if (action) {
        this.popUpType = action;
        this.onOpenPopUp();
      }

      if (cardNumber) {
        this.currentCard = this.cardService.accountsList[cardNumber - 1];
      }
    });

    setTimeout(() => {
      this.currentCard = this.cardService.accountsList[0];
      console.log("CurrentCard (action component): "+ this.cardService.accountsList[0]);
    }, 200);



    

    // this.cardService.cardChanged.subscribe((card) => {
    //   this.currentCard = card;
    //   console.log(this.currentCard);
    // });
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
