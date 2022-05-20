import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profilo', component: UserProfileComponent },
  // {path: 'gestione-conti', component: HomepageComponent},
  // {path: 'dipendente', component: HomepageComponent},
  // {path: 'error', component: HomepageComponent},
  // {path: '**', redirectTo: 'error'}, pagina di errore da fare dopo
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
