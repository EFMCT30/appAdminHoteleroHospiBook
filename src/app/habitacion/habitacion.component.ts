import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../service/habitacion.service';
import { TokenService } from '../service/token.service';
import Swal from 'sweetalert2';




import { Habitacion } from 'src/Entity/Habitacion';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  token: string | null = null;
  newHabitacion: Habitacion = new Habitacion(0,0, "",0,0,false,new Date(), 0);

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
    console.log(JSON.stringify(this.newHabitacion));
    if (this.token) {
      this.habitacionService.addHabitacion(this.token, this.newHabitacion).subscribe(
        (response) => {
          console.log('Nueva habitación registrada:', response);
          this.habitaciones.push(response);
          this.newHabitacion = new Habitacion(0,0, "",0,0,false,new Date(), 0);
            
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

  deleteHabitacion(habitacionId: number) {
    if (this.token !== null) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, ¡elimínalo!',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.token !== null) {
            this.habitacionService.deleteHabitacion(this.token, habitacionId).subscribe(
              (response) => {
                console.log('Habitación eliminada ID:', habitacionId);
                this.habitaciones = this.habitaciones.filter((h) => h.habitacionId !== habitacionId);
              },
              (error) => {
                console.error('Error al eliminar la habitación:', error);
              }
            );
          }
        }
      });
    }
  }

  openUpdateModal(habitacion: Habitacion) {
    this.newHabitacion = { ...habitacion };
    console.log('Habitación seleccionado para actualización:', this.newHabitacion);
  }

  updateHabitacion() {
    if (this.token && this.newHabitacion.hotelId !== 0) {
      this.habitacionService.updateHabitacion(this.token, this.newHabitacion.habitacionId, this.newHabitacion).subscribe(
        (response) => {
          console.log('Habitación actualizado:', response);
          
         const index = this.habitaciones.findIndex(h => h.habitacionId === this.newHabitacion.habitacionId);
  
          if (index !== -1) {

            this.habitaciones[index] = response;
          }
          Swal.fire({
            icon: 'success',
            title: '¡Habitación actualizada!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.error('Error al actualizar la habitación:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar la habitación',
            text: 'Hubo un problema al actualizar la habitación, por favor intenta de nuevo.',
          });
        }
      );
    }
  }
  

}