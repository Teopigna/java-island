import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  query: string = '';
  openings: boolean = false;
  closings: boolean = false;
  registering: boolean = false;

  shownList: {
    richiedente: string;
    conto: number;
    saldo: number;
    stato: string;
  }[] = [
    { richiedente: 'andrea', conto: 23, saldo: 0, stato: 'inattivo' },
    { richiedente: 'matteo', conto: 24, saldo: 0, stato: 'inattivo' },
    { richiedente: 'chiara', conto: 22, saldo: 0, stato: 'inattivo' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // { orderby: "price" }
      this.query = params['request'];

      console.log(this.query); // price
    });
  }
  request(request: any) {
    throw new Error('Method not implemented.');
  }

  onOpenAccount() {
    this.openings = true;
    // shownList= get list from server
  }
  onCloseAccount() {
    this.closings = true;
    // shownList= get list from server
  }
  onRegistration() {
    this.registering = true;
    // shownList= get list from server
  }

  onCloseMenu() {
    this.openings = false;
    this.closings = false;
    this.registering = false;
  }
}
