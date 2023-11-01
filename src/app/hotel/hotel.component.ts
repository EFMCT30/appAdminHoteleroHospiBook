import { Component, OnInit } from '@angular/core';
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
  hotel: any[] = [];
  token: string | null = null;
  newHotel: Hotel = new Hotel(0, '', '', '', 0, '', new Date(), '');

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



  addNewHotel() {
    console.log(this.newHotel);
    if (this.token) {
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
    console.log('Hotel seleccionado para actualización:', this.newHotel);
  }

  updateHotel() {
    console.log('Datos para la actualización:', this.newHotel);
    if (this.token && this.newHotel.hotelId !== 0) {
      this.axiosHotelService.updateHotel(this.token, this.newHotel.hotelId, this.newHotel).subscribe(
        (response) => {
          console.log('Hotel actualizado:', response);
          this.newHotel = new Hotel(0, '', '', '', 0, '', new Date(), '');
          
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
}
