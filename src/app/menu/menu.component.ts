import { AuthService } from './../auth/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { requestItem } from '../employee/employee.component';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';

interface PeopleData {
  name: string;
  lastName: string;
  account: number;
  balance: number;

}

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
  //requestList:string='request list vuota';
  fileUrl:any;

  userRole: string | undefined = '';


  constructor(private authService: AuthService,
    private http: HttpClient,
    private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
    if (this.authService.user.value) {
      this.userRole = this.authService.user.value?.role;
    }

    let requestList: PeopleData[] = [];

    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http
      .get<requestItem>(
        'http://localhost:8765/api/account_owners/intern',
        requestOptions
      )

    .subscribe(
        (resData: requestItem) => {

          const blob = new Blob([JSON.stringify(resData)], { type: '.txt' });
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        },
        (error) => {
          console.log(error);
        }
    );
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

  /*onDownloadList(){
    this.api.getYeah().subscribe((response) => {
      let data = JSON.stringify(response);
      const blob = new Blob([data], { type: 'application/json' });
      this.fileUrl = this.sanitizer.
           bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob))
    }



    let requestList: requestItem[] = [];



    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http
      .get<requestItem>(
        'http://localhost:8765/api/accounts/intern/registrations',
        requestOptions
      )

    .subscribe(
        (resData: requestItem) => {


          const blob = new Blob([JSON.stringify(resData)], { type: '.txt' });

          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

        },
        (error) => {
          console.log(error);
        }
    );


    console.log(this.requestList+'log')

  }*/
}
