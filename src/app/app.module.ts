import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ContentComponent } from './content/content.component';
import { ReservaComponent } from './reserva/reserva.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { HotelComponent } from './hotel/hotel.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FrontlayaoutComponent } from './frontlayaout/frontlayaout.component';
import { NavbarComponent } from './client/navbar/navbar.component';
import { BannerComponent } from './client/banner/banner.component';
import { UsercreateComponent} from "./usercreate/usercreate.component";
import { CuartosComponent } from './client/cuartos/cuartos.component';
import { ContactoemergenciaComponent } from './contactoemergencia/contactoemergencia.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    ProfileComponent,
    LoginComponent,
    LayoutComponent,
    ContentComponent,
    ReservaComponent,
    DashboardComponent,
    HabitacionComponent,
    HotelComponent,
    FrontlayaoutComponent,
    NavbarComponent,
    BannerComponent,
    CuartosComponent,
    ContactoemergenciaComponent,
    UsercreateComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
