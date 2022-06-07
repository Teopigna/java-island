import { NoPopupActionsComponent } from './dashboard/actions/no-popup-actions/no-popup-actions.component';
import { AuthGuardD } from './auth/authD.guard';
import { AuthGuardC } from './auth/authC.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccountManagementComponent } from './account-management/account-management.component';
import { EmployeeComponent } from './employee/employee.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuardC],
  },
  {
    path: 'bonifico',
    component: NoPopupActionsComponent,
  },
  {
    path: 'giroconto',
    component: NoPopupActionsComponent,
  },
  {
    path: 'ricarica',
    component: NoPopupActionsComponent,
  },
  {
    path: 'profilo',
    component: UserProfileComponent,
    // canActivate: [AuthGuardC],
  },
  {
    path: 'gestione-conti',
    component: AccountManagementComponent,
    // canActivate: [AuthGuardC],
  },
  {
    path: 'dipendente',
    component: EmployeeComponent,
    // canActivate: [AuthGuardD],
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error' }, //pagina di errore da fare dopo
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
