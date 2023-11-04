import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../service/habitacion.service';
import { TokenService } from '../service/token.service';
import {Habitacion} from "../../Entity/Habitacion";

import Swal from 'sweetalert2';





@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent implements OnInit {
  habitaciones: any[] = [];
  token: string | null = null; // Initialize the token as null
  newHabitacion: Habitacion = new Habitacion(0,"",0,0,true,"",0)


  constructor(
    private habitacionService: HabitacionService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();

    if (this.token) {
      this.habitacionService.getHabitacion(this.token).subscribe(
        (habitaciones) => {
          this.habitaciones = habitaciones;
        },
        (error) => {
          console.error('Error fetching habitaciones:', error);
        }
      );
    }
  }

  addNewHabitacion() {
    console.log(this.newHabitacion);
    if (this.token) {
      this.habitacionService.addHabitacion(this.token, this.newHabitacion).subscribe(
        (response) => {
          console.log('Nueva habitación registrada:', response);
          this.habitaciones.push(response);
          this.newHabitacion =  new Habitacion(0,"",0,0,true,"",0)

          Swal.fire({
            icon: 'success',
            title: '¡Habitación añadida!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.error('Error al registrar la nueva habitación:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al añadir la habitación',
            text: 'Hubo un problema al registrar la habitación, por favor intenta de nuevo.',
          });
        }


      );
    }
  }



}
