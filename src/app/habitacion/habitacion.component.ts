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
  token: string = ''; // Add a token property

  constructor(
    private habitacionService: HabitacionService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken(); // Retrieve the token
    // Now, you can use the token to fetch habitaciones
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

