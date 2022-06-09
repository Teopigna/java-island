import { Subscription } from 'rxjs';
import { Transaction } from './../../shared/transaction.model';
import { CardService } from '../../services/card-manage.service';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  fileList:string='';
  fileUrl: any;

  transactionsDisplayed: Transaction[] = [];

  transactionChangeSub: Subscription = new Subscription();

  constructor(private transactionService: TransactionService,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    //console.log(this.transactionsDisplayed);

    this.transactionChangeSub =
      this.transactionService.transactionsChanged.subscribe(() => {
        this.transactions = this.transactionService.transactions;
        this.transactionsDisplayed = this.transactions;
        this.downloadList()
      })
    this.fileList='';
  }

  downloadList(){
    for(let i=0; i<this.transactionsDisplayed.length;i++){
      let line: string='';
      let causale:string='';
      if(String(this.transactionsDisplayed[i].cause)=='null'){
        causale='/';
      }else{
        causale=String(this.transactionsDisplayed[i].cause)
      }
      line=(
        'mittente:'+this.transactionsDisplayed[i].accountNumberFrom+
        ', destinatario:'+this.transactionsDisplayed[i].accountNumberTo+
        ', ammontare:'+this.transactionsDisplayed[i].amount+
        ', causale:'+causale+
        ', data:'+this.transactionsDisplayed[i].date+'\n'
        )
        this.fileList=this.fileList+line

        const blob = new Blob(['LISTA TRANSAZIONI \n' + this.fileList], {
          type: '.txt',
        });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          window.URL.createObjectURL(blob)
        );
    }

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
