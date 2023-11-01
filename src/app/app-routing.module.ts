import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import {AuthGuard} from "./service/auth-guard.service";
import {FrontlayaoutComponent} from "./frontlayaout/frontlayaout.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'index', component: FrontlayaoutComponent },
  {
    path: '',
    canActivate: [AuthGuard], // Apply the AuthGuard to all routes
    children: [
      {
        path: 'profile',
        component: LayoutComponent,
        data: { title: 'Profile' },
      },
      {
        path: 'reserva',
        component: LayoutComponent,
        data: { title: 'Reserva' },
      },
      {
        path: 'dashboard',
        component: LayoutComponent,
        data: { title: 'Panel de Control' },
      },
      {
        path: 'habitacion',
        component: LayoutComponent,
        data: { title: 'Habitacion' },
      },
      {
        path: 'hotel',
        component: LayoutComponent,
        data: { title: 'Hotel' },
      },
      // Add other routes as needed
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
