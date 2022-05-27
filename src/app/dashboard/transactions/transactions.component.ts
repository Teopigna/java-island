import { CardService } from '../../services/card-manage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions:
    | {
        id: number;
        type: string;
        amount: number;
        date: string;
        from: string;
        to: string;
        description: string;
      }[] = [];

  transactionsDisplayed: {
    id: number;
    type: string;
    amount: number;
    date: string;
    from: string;
    to: string;
    description: string;
  }[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.transactions = this.cardService.transactions;

    this.transactionsDisplayed = this.transactions;
  }

  onShrinkArray(howMany: number) {
    if (howMany === 10) {
      this.transactionsDisplayed = this.transactions.slice(0, 10);
    }
    // -1 lo uso come caso limite per indicare TUTTE le transazioni
    else if (howMany === -1) {
      this.transactionsDisplayed = this.transactions;
    }
  }
}
