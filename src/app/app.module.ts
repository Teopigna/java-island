import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountCardComponent } from './dashboard/account-card/account-card.component';
import { GraphicAreaComponent } from './dashboard/graphic-area/graphic-area.component';
import { ActionsComponent } from './dashboard/actions/actions.component';
import { TransactionsComponent } from './dashboard/transactions/transactions.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, DashboardComponent, AccountCardComponent, GraphicAreaComponent, ActionsComponent, TransactionsComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
