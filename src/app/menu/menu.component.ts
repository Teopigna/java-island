import { AuthService } from './../auth/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

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
  menuDashboard: boolean = false;
  fileUrl: any;
  requestList: string = '';
  printList: any = [];

  userRole: string | undefined = '';

  // se è vero: ho il menu da desktop
  // altrimenti ho l'hamburger
  desktopMenu: boolean = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onResize();

    this.route.url.subscribe((data: any) => {
      if (data[0].path === 'dipendent') {
        this.menuDashboard = false;
      } else {
        this.menuDashboard = true;
      }
    });

    if (this.authService.user.value) {
      this.userRole = this.authService.user.value?.role;

      this.menu = this.userRole === 'D' ? 'open' : 'closed';
      this.menuState = this.userRole === 'D' ? 'open' : 'closed';
    }

    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http
      .get<any>(
        'http://localhost:8765/api/account_owners/intern',
        requestOptions
      )

      .subscribe(
        (resData: any) => {
          this.printList = resData;
          for (let i = 0; i < this.printList.length; i++) {
            delete this.printList[i]['id'];
            let valore: string = ''; //dichiaro la variabile valore che uso per modificare la lunghezza della data
            valore = this.printList[i]['birthDate']; //e poi la ricopio nel campo BirthDate
            valore = valore.substring(0, 10);
            this.printList[i]['birthDate'] = valore;
          }
          this.requestList = JSON.stringify(this.printList);
        },

        (error) => {}
      );

    setTimeout(() => {
      this.requestList = this.requestList.replace(/]/g, '');
      this.requestList = this.requestList.replace(/"/g, '');
      this.requestList = this.requestList.replace(/},{/g, '\n');
      this.requestList = this.requestList.replace(/,/g, ', ');
      this.requestList = this.requestList.replace(/}/g, '');
      this.requestList = this.requestList.replace(/{/g, '');
      this.requestList = this.requestList.replace(/firstName/g, 'nome');
      this.requestList = this.requestList.replace(/lastName/g, 'cognome');
      this.requestList = this.requestList.replace(
        /birthDate/g,
        'data di nascita'
      );
      this.requestList = this.requestList.substring(1);

      const blob = new Blob(['LISTA DEI CORRENTISTI \n' + this.requestList], {
        type: '.txt',
      });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(blob)
      );
    }, 1000);
  }

  // resize della pagina cambia il tipo di menu che si visualizza
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (window.innerWidth < 900) {
      this.desktopMenu = false;
    } else {
      this.desktopMenu = true;
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
      }, 500);
    } else {
      this.menu = 'open';
      // il setTimeout qui è necessario perché altrimenti si sovrappongono la
      // creazione del div interessato e la partenza dell'animazione (l'animazione
      // non può partire se il div non è stato creato)
      setTimeout(() => {
        this.menuState = 'open';
      }, 10);
    }
  }
}
