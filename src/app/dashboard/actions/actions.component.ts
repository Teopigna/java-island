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

  routeSub: Subscription = new Subscription();

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      const action = params['action'];
      if (action) {
        this.popUpType = action;
        this.onOpenPopUp();
      }
    });
  }

  onClosePopUp(close: boolean) {
    this.closedPopUp = true;

    if (this.cardService.cardDisplayed.active) {
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

    console.log(this.closedPopUp);
  }

  onOpenPopUp() {
    this.closedPopUp = false;
    console.log(this.closedPopUp);
  }
}
