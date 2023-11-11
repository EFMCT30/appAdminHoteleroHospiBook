import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HotelserviceService } from '../service/hotelservice.service';
import { TokenService } from '../service/token.service';
import { Hotel } from '../../Entity/Hotel';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
})
export class HotelComponent implements OnInit {

  @ViewChild('exampleModal') exampleModal!: ElementRef;
  @ViewChild('updateHotelModal') updateHotelModal!: ElementRef;

  hotel: any[] = [];
  token: string | null = null;
  newHotel: Hotel = new Hotel(0, '', '', '', 0, '', new Date(), '');
  terminoBusqueda: string = '';
  hotelesFiltrados: any[] = [];

  constructor(
    private axiosHotelService: HotelserviceService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();

    if (this.token) {
      this.axiosHotelService.getHotels(this.token).subscribe(
        (hoteles) => {
          this.hotel = hoteles;
        },
        (error) => {
          console.error('Error fetching hotels:', error);
        }
      );
    }
  }

  camposRequeridosEstanCompletos(newHotel: Hotel): boolean {
    return (
      !!newHotel.nombre &&
      !!newHotel.direccion &&
      !!newHotel.telefono &&
      !!newHotel.estrellas &&
      !!newHotel.descripcion &&
      !!newHotel.fechaConstruccion &&
      !!newHotel.categoria
    );
  }

  addNewHotel() {
    // Verifica si los campos requeridos no están vacíos
    if (this.token && this.camposRequeridosEstanCompletos(this.newHotel)) {
      this.axiosHotelService.addHotel(this.token, this.newHotel).subscribe(
        (response) => {
          console.log('Nuevo hotel registrado:', response);
          this.hotel.push(response);
          this.newHotel = new Hotel(0, '', '', '', 0, '', new Date(), '');

          Swal.fire({
            icon: 'success',
            title: '¡Hotel añadido!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.error('Error al registrar el nuevo hotel:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al añadir el hotel',
            text: 'Hubo un problema al registrar el hotel, por favor intenta de nuevo.',
          });
        }
      );
    } else {
      // Muestra un mensaje al usuario indicando que los campos están incompletos
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos incompletos',
        text: 'Por favor completa todos los campos requeridos.',
      });
    }
  }

  deleteHotel(hotelId: number) {
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
            this.axiosHotelService.deleteHotel(this.token, hotelId).subscribe(
              (response) => {
                console.log('Hotel eliminado ID:', hotelId);
                this.hotel = this.hotel.filter((h) => h.hotelId !== hotelId);
              },
              (error) => {
                console.error('Error al eliminar el hotel:', error);
              }
            );
          }
        }
      });
    }
  }


  openUpdateModal(hotel: Hotel) {
    this.newHotel = { ...hotel };
  }

  updateHotel() {
    if (this.token && this.newHotel.hotelId !== 0) {
      this.axiosHotelService.updateHotel(this.token, this.newHotel.hotelId, this.newHotel).subscribe(
        (response) => {
          console.log('Hotel actualizado:', response);

          // Busca el índice del hotel actualizado en this.hotel
          const index = this.hotel.findIndex(h => h.hotelId === this.newHotel.hotelId);

          if (index !== -1) {
            // Actualiza el hotel en this.hotel con los datos del servidor
            this.hotel[index] = response;
          }
          Swal.fire({
            icon: 'success',
            title: '¡Hotel actualizado!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.error('Error al actualizar el hotel:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el hotel',
            text: 'Hubo un problema al actualizar el hotel, por favor intenta de nuevo.',
          });
        }
      );
    }
  }

  buscarHoteles() {
    if (this.token && this.terminoBusqueda.trim() !== '') {
      this.axiosHotelService.searchHotelsByInitials(this.token, this.terminoBusqueda).subscribe(
        (hoteles) => {
          this.hotelesFiltrados = hoteles;
        },
        (error) => {
          console.error('Error al buscar hoteles:', error);
          // Manejo del error, podría ser un mensaje o alguna acción específica.
        }
      );
    } else {
      this.hotelesFiltrados = [];
    }
  }

}
