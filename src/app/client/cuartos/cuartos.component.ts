import { Component, OnInit } from '@angular/core';
import {CuartoService} from "../../service/cuarto.service";
import { Habitacion } from 'src/Entity/Habitacion';
import { HabitacionService } from 'src/app/service/habitacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-cuartos',
  templateUrl: './cuartos.component.html',
  styleUrls: ['./cuartos.component.css']
})
export class CuartosComponent implements OnInit{
  habitaciones: any[] = [];
  token: string | null = null;
  idHabitacion: number = 1;
  habitacionSeleccionada: any | null = null;

  constructor(private cuartosService: CuartoService,
    private tokenservice : TokenService,
    private habitacionService: HabitacionService) {}

  ngOnInit(): void {
    this.cuartosService.getHabitaciones().subscribe(
      habitaciones => this.habitaciones = habitaciones,
      error => console.error('Error fetching habitaciones:', error)
    );
    this.obtenerHabitacionPorId();
  }

  obtenerHabitacionPorId(): void {
    if (this.token !== null) {
      this.habitacionService.obtenerHabitacionPorId(this.idHabitacion, this.token)
        .subscribe(
          (habitacion: any) => {
            this.habitaciones = habitacion;
            console.log('Habitación obtenida:', this.habitaciones);
            // Aquí puedes manejar la habitación obtenida
          },
          (error: any) => {
            console.error('Error al obtener la habitación:', error);
            // Manejo de errores
          }
        );
    } else {
      console.error('El token es null. No se puede realizar la solicitud.');
      // Puedes manejar esta situación de token nulo según tu lógica
    }
  }

  mostrarDetallesHabitacion(habitacion: any): void {
    this.habitacionSeleccionada = habitacion; // Guardar la habitación seleccionada
  }

}
