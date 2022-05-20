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

  constructor(private route: ActivatedRoute, private router: Router) {}

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

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: null },
    });

    console.log(this.closedPopUp);
  }

  onOpenPopUp() {
    this.closedPopUp = false;
    console.log(this.closedPopUp);
  }
}
