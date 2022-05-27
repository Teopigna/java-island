import { TransactionService } from './../../services/transaction.service';
import { CardService } from '../../services/card-manage.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

// data.data è un esempio: andranno sostituiti con i dati che arrivano dal be con le transazioni

@Component({
  selector: 'app-graphic-area',
  templateUrl: './graphic-area.component.html',
  styleUrls: ['./graphic-area.component.css'],
})
export class GraphicAreaComponent implements OnInit, OnDestroy {
  data = {
    chart: {
      caption: 'Grafico delle <b>tue</b> transazioni',
      yaxisname: 'Ammontare',
      anchorradius: '5',
      plottooltext: '$label: <b>$dataValue</b>',
      showhovereffect: '1',
      showvalues: '0',
      numbersuffix: '€',
      theme: 'fusion',
      anchorbgcolor: '#70fdea',
      palettecolors: '#70fdea',
    },
    data: [
      {
        label: '',
        value: 0,
      },
    ],
  };
  // da aggiunstare width e height a seconda della grandezza che ci serve... magari cambiarla in relazione
  // alla grandezza del viewport, ma bisogna mettere in ascolto il file ts (@hostlistener)
  // per il momento, o se non si riesce a fare, mettiamo una grandezza che va bene
  // per ogni tipo di device

  // da provare altro: più responsive
  width: any = '40%';
  height = '170';
  type = 'spline';
  dataFormat = 'json';
  dataSource = this.data;

  // per la progress bar:
  progressAnimation = '0';
  maxprogress = '60';
  subscription?: Subscription;

  constructor(private traService: TransactionService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.currentTarget.innerWidth * 0.4;
  }

  ngOnInit(): void {
    // per la progress bar
    this.subscription = interval(100).subscribe(() => {
      this.changeWidth();
      if (+this.progressAnimation >= +this.maxprogress) {
        this.subscription?.unsubscribe();
      }
    });

    let i = 0;
    for (let item of this.traService.transactions.reverse()) {
      if (i <= 10) {
        this.data.data.push({
          label: item.date.toString(),
          value: item.amount,
        });
      } else {
        break;
      }
      i++;
    }
    // inserire la questione che si aggiorna in modo automatico anche all'inizio: la width
  }

  private changeWidth() {
    this.progressAnimation = (+this.progressAnimation + 4).toString();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
