import { Component, OnInit } from '@angular/core';
import { HotelserviceService } from '../service/hotelservice.service';
import { TokenService } from '../service/token.service';
import { Hotel } from '../../Entity/Hotel';

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
        },
        (error) => {
          console.error('Error al registrar el nuevo hotel:', error);
        }
      );
    }
  }
 
}
