import { AuthService } from './../auth/auth.service';
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

  userRole: string | undefined = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.user.value) {
      this.userRole = this.authService.user.value?.role;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  onSlideMenu() {
    if (this.menuState === 'open') {
      this.menuState = 'closed';
      setTimeout(() => {
        this.menu = 'closed';
        console.log(this.menu);
      }, 500);
    } else {
      this.menu = 'open';
      // il setTimeout qui è necessario perché altrimenti si sovrappongono la
      // creazione del div interessato e la partenza dell'animazione (l'animazione
      // non può partire se il div non è stato creato)
      setTimeout(() => {
        this.menuState = 'open';
      }, 10);
      console.log(this.menu);
    }
  }
}
