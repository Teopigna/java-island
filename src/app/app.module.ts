import { TwoDigitDecimalDirectiveMat } from './shared/directives/two-digit-decimal-mat.directive';
import { TwoDigitDecimalDirective } from './shared/directives/two-digit-decimal.directive';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { EmployeeComponent } from './employee/employee.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountCardComponent } from './dashboard/account-card/account-card.component';
import { GraphicAreaComponent } from './dashboard/graphic-area/graphic-area.component';
import { ActionsComponent } from './dashboard/actions/actions.component';
import { TransactionsComponent } from './dashboard/transactions/transactions.component';
import { PopUpComponent } from './dashboard/actions/pop-up/pop-up.component';
import {
  HomepageComponent,
  NgbDateCustomParserFormatter,
} from './homepage/homepage.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { FusionChartsModule } from 'angular-fusioncharts';

import * as FusionCharts from 'fusioncharts';
import * as charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import {
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FooterComponent } from './footer/footer.component';
import { ProgressBarsComponent } from './dashboard/progress-bars/progress-bars.component';
import { AddCardPopupComponent } from './account-management/add-card-popup/add-card-popup.component';
import { WarningPopupComponent } from './account-management/warning-popup/warning-popup.component';
import { NoPopupActionsComponent } from './dashboard/actions/no-popup-actions/no-popup-actions.component';
import { TransactionAllPageComponent } from './dashboard/transaction-all-page/transaction-all-page.component';
import { TransactionDetailComponent } from './dashboard/transaction-all-page/transaction-detail/transaction-detail.component';


FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    AccountManagementComponent,
    EmployeeComponent,
    MenuComponent,
    DashboardComponent,
    AccountCardComponent,
    GraphicAreaComponent,
    ActionsComponent,
    TransactionsComponent,
    PopUpComponent,
    HomepageComponent,
    UserProfileComponent,
    ErrorPageComponent,
    FooterComponent,
    ProgressBarsComponent,
    AddCardPopupComponent,
    WarningPopupComponent,
    NoPopupActionsComponent,
    TwoDigitDecimalDirective,
    TransactionAllPageComponent,
    TransactionDetailComponent,
    TwoDigitDecimalDirectiveMat,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FusionChartsModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSortModule
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
