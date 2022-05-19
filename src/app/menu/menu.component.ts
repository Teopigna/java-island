import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menuState = 'closed';

  constructor() {}

  ngOnInit(): void {}

  onLogout() {
    // si chiama qui la funzione logout dal service auth
  }

  onSlideMenu() {
    this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
    console.log(this.menuState);
  }
}
