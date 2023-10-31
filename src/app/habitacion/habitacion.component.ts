import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../service/habitacion.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent implements OnInit {
  habitaciones: any[] = [];
  token: string | null = null; // Initialize the token as null

  constructor(
    private habitacionService: HabitacionService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken(); // Retrieve the token

    if (this.token) {
      // Only fetch habitaciones if the token is not null
      this.habitacionService.getHabitaciones(this.token).subscribe(
        (habitaciones) => {
          this.habitaciones = habitaciones;
        },
        (error) => {
          console.error('Error fetching habitaciones:', error);
        }
      );
    }
  }
}
