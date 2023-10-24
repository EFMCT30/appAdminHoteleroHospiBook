import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    component: LayoutComponent, // Use the layout component as the parent route
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }