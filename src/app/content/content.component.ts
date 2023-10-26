import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  otherRoutes: boolean = false;
  isProfileRoute: boolean = false;
  isDashboardRoute: boolean=false;
  isHabitacionRoute: boolean=false;
  isReservaRoute: boolean=false;
  isHotelRoute: boolean=false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isProfileRoute = this.route.snapshot.routeConfig?.path === 'profile';
    this.isDashboardRoute = this.route.snapshot.routeConfig?.path === 'dashboard';
    this.isReservaRoute = this.route.snapshot.routeConfig?.path === 'reserva';
    this.isHabitacionRoute = this.route.snapshot.routeConfig?.path === 'habitacion';
    this.isHotelRoute = this.route.snapshot.routeConfig?.path === 'hotel';
  }
}
