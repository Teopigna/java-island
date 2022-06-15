import { Transaction } from './../../../shared/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css'],
})
export class TransactionDetailComponent implements OnInit {
  id: number = 0;
  transactions: Transaction[] | undefined;
  transaction: Transaction | undefined;
  transactionChangeSub: any;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];

    this.transactionChangeSub =
      this.transactionService.currentTransactionChanged.subscribe(
        (currentTransaction) => {
          this.transaction = currentTransaction;
        }
      );
  }
}
