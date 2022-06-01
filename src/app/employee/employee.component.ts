import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth/auth.service';

export interface requestItem {
  id: number;
  accountNumber: string;
  firstName:string;
  lastName:string;
  balance: number;
  status: number;
  accountOwnerId: number;
}

//id: 1, accountNumber: 'IT80999612', balance: 0, status: 1, accountOwnerId: 1}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  query: string = '';
  title: string = '';



  requestList: requestItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['request'];


      if (this.query === 'apertura') {
        this.onOpenAccount();
      } else if (this.query === 'chiusura') {
        this.onCloseAccount();
      } else if (this.query === 'registrazione') {
        this.onRegistration();
      }
    });
  }
  request(request: any) {
    throw new Error('Method not implemented.');
  }

  onOpenAccount() {
    this.title = 'apertura conto';
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http
      .get<requestItem>(
        'http://localhost:8765/api/accounts/intern/opening_accounts',
        requestOptions
      )

    .subscribe(
        (resData: any) => {
          this.requestList = resData;
          console.log(this.requestList);
        },
        (error) => {
          console.log(error);
        }
    );
  }
  onCloseAccount() {
    this.title = 'chiusura conto';
    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http
      .get<requestItem>(
        'http://localhost:8765/api/accounts/intern/closing_accounts',
        requestOptions
      )

    .subscribe(
        (resData: any) => {
          this.requestList = resData;
          console.log(this.requestList);
        },
        (error) => {
          console.log(error);
        }
    );


  }
  onRegistration() {
    this.title = 'registrazione account';

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
        (resData: any) => {
          this.requestList = resData;
          console.log(this.requestList);
        },
        (error) => {
          console.log(error);
        }
    );
  }

  onAcceptRequest(index:number) {


    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http.put<any>('http://localhost:8765/api/accounts/intern/validation/'+ this.requestList[index].id,{account_id: this.requestList[index].id} ,requestOptions)
        .subscribe((res)=>this.onRegistration());



  }

  onDeclineRequest(index:number) {

    const headerDict = {
      Authorization: this.authService.user.value!.token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    switch ( this.query ) {
      case 'apertura':
          this.onOpenAccount()
          break;
      case 'chiusura':
          this.onCloseAccount()
          break;
      case 'registrazione':
        this.http.put<any>('http://localhost:8765/api/accounts/intern/rejection/'+ this.requestList[index].id,{account_id: this.requestList[index].id} ,requestOptions)
        .subscribe((res)=>this.onRegistration());
        this.onRegistration()
          break;
      default:
          //
          break;
   }



  }

  onRefresh(){
    switch ( this.query ) {
      case 'apertura':
          this.onOpenAccount()
          break;
      case 'chiusura':
          this.onCloseAccount()
          break;
      case 'registrazione':
          this.onRegistration()
          break;
      default:
          //
          break;
   }
  }
}
