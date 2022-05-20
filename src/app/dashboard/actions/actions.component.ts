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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const action = params['action'];
      if (action) {
        this.popUpType = action;
        this.onOpenPopUp();
      }
      console.log(action);
    });
  }

  onClosePopUp(close: boolean) {
    this.closedPopUp = true;
    console.log(this.closedPopUp);
  }

  onOpenPopUp() {
    this.closedPopUp = false;
    console.log(this.closedPopUp);
  }
}
