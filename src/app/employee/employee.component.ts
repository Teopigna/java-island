import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  shownList: { nome: string; eta: number; citta: string }[] = [
    { nome: 'andrea', eta: 23, citta: 'milano' },
    { nome: 'matteo', eta: 24, citta: 'torino' },
    { nome: 'chiara', eta: 22, citta: 'roma' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
