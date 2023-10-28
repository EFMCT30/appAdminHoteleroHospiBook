import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',component: LayoutComponent ,data: { 'title': 'Profile' },
  },
  { path: 'reserva', component: LayoutComponent,data: { 'title': 'Reserva' }},
  { path: 'dashboard', component: LayoutComponent,data: { 'title': 'Panel de Control' }},
  { path: 'habitacion', component: LayoutComponent,data: { 'title': 'Habitacion' }},
  { path: 'hotel', component: LayoutComponent,data: { 'title': 'Hotel' }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
