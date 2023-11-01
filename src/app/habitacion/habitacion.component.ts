import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../service/habitacion.service';
import { TokenService } from '../service/token.service';
import  Swal  from 'sweetalert2';
import { Habitacion } from 'src/Entity/Habitacion';


@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent implements OnInit {
  habitaciones: any[] = [];
  token: string | null = null; // Initialize the token as null
  newHabitacion: Habitacion = new Habitacion(0, "", 0, 0, false, new Date(), 0);

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
         console.log(habitaciones);
          this.habitaciones = habitaciones;
        },
        (error) => {
          console.error('Error fetching habitaciones:', error);
        }
      );
    }
  }


  addNewHotel() {
    console.log(this.newHabitacion); 
    if (this.token) {
      this.habitacionService.createHabitacion(this.token, this.newHabitacion).subscribe(
        (response) => {
          console.log('Nuevo habitación registrado:', response);
          this.habitaciones.push(response);
          this.newHabitacion = new Habitacion(0, '', 0, 0, false, new Date(), 0);
  
          // Utilizando SweetAlert2 para mostrar un mensaje de confirmación
          Swal.fire({
            icon: 'success',
            title: '¡Habitación añadida!',
            showConfirmButton: false,
            timer: 1500 // Opcional: tiempo en milisegundos antes de que se cierre el mensaje
          });
        },
        (error) => {
          console.error('Error al registrar la habitación:', error);
          // Mostrar un mensaje de error con SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error al añadir la habitación',
            text: 'Hubo un problema al registrar la habitación, por favor intenta de nuevo.'
          });
        }
      );
    }
  }


  deleteHabitacion(habitacionId: number) {
    if (this.token !== null) {
      // Mostrar el mensaje de confirmación con SweetAlert
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, ¡elimínalo!'
      }).then((result: { isConfirmed: any; }) => {
        if (result.isConfirmed) { // Verificar si se confirmó la eliminación
          if (this.token !== null) { // Verificar nuevamente el token antes de hacer la llamada
            this.habitacionService.deleteHabitacion(this.token, habitacionId).subscribe(
              (response) => {
                console.log('Habitación eliminado ID:', habitacionId);
                // Remover el hotel eliminado de la lista
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

  
  

}
