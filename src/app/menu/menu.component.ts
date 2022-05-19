import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('menu', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(-170px)',
        })
      ),

      transition('open<=>closed', animate(500)),
    ]),
  ],
})
export class MenuComponent implements OnInit {
  menuState = 'closed';
  menu = 'closed';

  constructor() {}

  ngOnInit(): void {}

  onLogout() {
    // si chiama qui la funzione logout dal service auth
  }

  onSlideMenu() {
    // this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
    if (this.menuState === 'open') {
      this.menuState = 'closed';
      setTimeout(() => {
        this.menu = 'closed';
        console.log(this.menu);
      }, 500);
    } else {
      this.menu = 'open';
      setTimeout(() => {
        this.menuState = 'open';
      }, 50);
      console.log(this.menu);
    }
  }
}
