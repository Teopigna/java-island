import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

// data.data è un esempio: andranno sostituiti con i dati che arrivano dal be con le transazioni
const data = {
  chart: {
    caption: 'Average Monthly Temperature in Texas',
    yaxisname: 'Average Monthly Temperature',
    anchorradius: '5',
    plottooltext: 'Average temperature in $label is <b>$dataValue</b>',
    showhovereffect: '1',
    showvalues: '0',
    numbersuffix: '°C',
    theme: 'fusion',
    anchorbgcolor: '#70fdea',
    palettecolors: '#70fdea',
  },
  data: [
    {
      label: 'Jan',
      value: '1',
    },
    {
      label: 'Feb',
      value: '5',
    },
    {
      label: 'Mar',
      value: '10',
    },
    {
      label: 'Apr',
      value: '12',
    },
    {
      label: 'May',
      value: '14',
    },
    {
      label: 'Jun',
      value: '16',
    },
    {
      label: 'Jul',
      value: '20',
    },
    {
      label: 'Aug',
      value: '22',
    },
    {
      label: 'Sep',
      value: '20',
    },
    {
      label: 'Oct',
      value: '16',
    },
    {
      label: 'Nov',
      value: '7',
    },
    {
      label: 'Dec',
      value: '2',
    },
  ],
};

@Component({
  selector: 'app-graphic-area',
  templateUrl: './graphic-area.component.html',
  styleUrls: ['./graphic-area.component.css'],
})
export class GraphicAreaComponent implements OnInit, OnDestroy {
  // da aggiunstare width e height a seconda della grandezza che ci serve... magari cambiarla in relazione
  // alla grandezza del viewport, ma bisogna mettere in ascolto il file ts (@hostlistener)
  // per il momento, o se non si riesce a fare, mettiamo una grandezza che va bene
  // per ogni tipo di device

  width = '360';
  height = '170';
  type = 'spline';
  dataFormat = 'json';
  dataSource = data;

  // per la progress bar:
  progressAnimation = '0';
  maxprogress = '60';
  subscription?: Subscription;

  constructor() {}

  ngOnInit(): void {
    // per la progress bar
    this.subscription = interval(100).subscribe(() => {
      this.changeWidth();
      if (+this.progressAnimation >= +this.maxprogress) {
        this.subscription?.unsubscribe();
      }
    });
  }

  private changeWidth() {
    this.progressAnimation = (+this.progressAnimation + 4).toString();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
