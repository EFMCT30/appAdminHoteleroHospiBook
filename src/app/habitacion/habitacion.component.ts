import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HabitacionService } from '../service/habitacion.service';
import { HotelserviceService } from '../service/hotelservice.service';
import { TokenService } from '../service/token.service';
import Swal from 'sweetalert2';
import { Habitacion } from 'src/Entity/Habitacion';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent implements OnInit {
  hotelesDisponibles: any[] = [];
  habitaciones: Habitacion[] = [];
  token: string | null = null;
  newHabitacion: Habitacion = new Habitacion(
    0,
    0,
    '',
    0,
    0,
    false,
    new Date(),
    0,
    'uploads/images/empty-room.jpg'
  );

  searchQuery: string = '';
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef =
    new ElementRef('fileInput');

  @ViewChild('fileInputFromUpdate', { static: false })
  fileInputFromUpdate: ElementRef = new ElementRef('fileInputFromUpdate');

  constructor(
    private habitacionService: HabitacionService,
    private tokenService: TokenService,
    private axiosHotelService: HotelserviceService
  ) {}

  ngOnInit(): void {
    this.listarHabitaciones();
    this.token = this.tokenService.getToken();

  if (this.token) {
    this.axiosHotelService.getHotels(this.token).subscribe(
      (hotels) => {
        this.hotelesDisponibles = hotels;
        if (this.hotelesDisponibles.length > 0) {
          this.newHabitacion.hotelId = this.hotelesDisponibles[0].hotelId; // Establecer el primer hotel por defecto
        }
      },
      (error) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }
  }

  listarHabitaciones() {
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

  /*addNewHabitacion() {
    console.log(JSON.stringify(this.newHabitacion));
    const file: File = this.fileInput.nativeElement.files[0];
    if (this.token) {
      this.habitacionService
        .addHabitacion(this.token, this.newHabitacion)
        .subscribe(
          (response) => {
            console.log('Nueva habitación registrada:', response);
            if (file) {
              this.updatePhotoHabitacion(file, response, false);
            } else {
              this.actualizarTablaHabitaciones(response);
            }
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
  }*/

  addNewHabitacion() {
    const camposVacios: string[] = [];
  const camposInvalidos: string[] = [];
  
  if (!this.newHabitacion.capacidad || this.newHabitacion.capacidad > 6) {
    camposInvalidos.push('Capacidad (máximo 6)');
  }
  if (!this.newHabitacion.fechaUltimaMantenimiento) {
    camposVacios.push('Fecha de Último Mantenimiento');
  }
  if (!this.newHabitacion.numeroHabitacion) {
    camposVacios.push('Número de Habitación');
  }
  if (!this.newHabitacion.precioNoche || this.newHabitacion.precioNoche < 250) {
    camposInvalidos.push('Precio por Noche (mínimo $250)');
  }
  if (!this.newHabitacion.tipo) {
    camposVacios.push('Tipo de Habitación');
  }
  if (!this.newHabitacion.hotelId) {
    camposVacios.push('Nombre del Hotel');
  }


  if (camposVacios.length > 0 || camposInvalidos.length > 0) {
    let mensaje = '';
    if (camposVacios.length > 0) {
      mensaje += `Por favor completa los siguientes campos: ${camposVacios.join(', ')}. `;
    }
    if (camposInvalidos.length > 0) {
      mensaje += `Los siguientes campos tienen datos inválidos o no cumplen con los requisitos: ${camposInvalidos.join(', ')}.`;
    }
    Swal.fire({
      icon: 'warning',
      title: 'Datos incompletos o inválidos',
      text: mensaje,
    });
  } else {
      // Aquí procederías a agregar la habitación
      console.log(JSON.stringify(this.newHabitacion));
      const file: File = this.fileInput.nativeElement.files[0];
      if (this.token) {
        this.habitacionService
          .addHabitacion(this.token, this.newHabitacion)
          .subscribe(
            (response) => {
              console.log('Nueva habitación registrada:', response);
              if (file) {
                this.updatePhotoHabitacion(file, response, false);
              } else {
                this.actualizarTablaHabitaciones(response);
              }
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
  

  updatePhotoHabitacion(file: File, responseHabitacion: any, isFromUpdate: boolean) {
    console.log(responseHabitacion);
    if (this.token) {
      this.habitacionService
        .subirFoto(this.token, responseHabitacion.habitacionId, file)
        .subscribe(
          (response) => {
            if(isFromUpdate){
              this.listarHabitaciones();
            }
            else {
              this.actualizarTablaHabitaciones(response);
            }
          },
          (error) => {
            console.error('Error al subir foto de la nueva habitación:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al añadir la foto de habitación',
              text: 'Hubo un problema al registrar la foto de la habitación, por favor intenta de nuevo.',
            });
          }
        );
    }
  }

  actualizarTablaHabitaciones(response: any) {
    this.habitaciones.push(response);
    this.newHabitacion = new Habitacion(
      0,
      0,
      '',
      0,
      0,
      false,
      new Date(),
      0,
      ''
    );

    Swal.fire({
      icon: 'success',
      title: '¡Habitación añadida!',
      showConfirmButton: false,
      timer: 1500,
    });
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
            this.habitacionService
              .deleteHabitacion(this.token, habitacionId)
              .subscribe(
                (response) => {
                  console.log('Habitación eliminada ID:', habitacionId);

                  this.habitaciones = this.habitaciones.filter(
                    (h) => h.habitacionId !== habitacionId
                  );
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
    console.log(
      'Habitación seleccionado para actualización:',
      this.newHabitacion
    );
  }

  updateHabitacion() {
    const file: File = this.fileInputFromUpdate.nativeElement.files[0];
    if (this.token && this.newHabitacion.hotelId !== 0) {
      this.habitacionService
        .updateHabitacion(
          this.token,
          this.newHabitacion.habitacionId,
          this.newHabitacion
        )
        .subscribe(
          (response) => {
            console.log('Habitación actualizado:', response);
            if (file) {
              this.updatePhotoHabitacion(file, response, true);
            } else {
              this.listarHabitaciones();
            }

            const index = this.habitaciones.findIndex(
              (h) => h.habitacionId === this.newHabitacion.habitacionId
            );

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

  handleUpdateResponse(response: any) {
    this.actualizarTablaHabitaciones(response);

    const index = this.habitaciones.findIndex(
      (h) => h.habitacionId === this.newHabitacion.habitacionId
    );

    if (index !== -1) {
      this.habitaciones[index] = response;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Habitación actualizada!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  handleError(errorMessage: string) {
    Swal.fire({
      icon: 'error',
      title: errorMessage,
      text: 'Hubo un problema, por favor intenta de nuevo.',
    });
  }

  onFileSelected(event: any) {
    // Puedes realizar acciones adicionales aquí si es necesario
  }

  searchHabitacionesDisponibles() {
    if (this.token) {
      this.habitacionService
        .getHabitacionesDisponibles(this.token, this.searchQuery)
        .subscribe(
          (habitaciones) => {
            this.habitaciones = habitaciones;
          },
          (error) => {
            console.error('Error fetching available habitaciones:', error);
          }
        );
    }
  }
}
