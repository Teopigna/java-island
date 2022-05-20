import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

  onOpenAccount() {
    // shownList= get list from server
  }
  onCloseAccount() {
    // shownList= get list from server
  }
  onRegistration() {
    // shownList= get list from server
  }
}
