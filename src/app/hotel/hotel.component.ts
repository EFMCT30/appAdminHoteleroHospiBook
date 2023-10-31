import { Component, OnInit } from '@angular/core';
import { HotelserviceService } from '../service/hotelservice.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
})
export class HotelComponent implements OnInit {
  hotel: any[] = [];
  token: string = ''; // Add a token property

  constructor(
    private axiosHotelService: HotelserviceService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken(); // Retrieve the token
    // Now, you can use the token to fetch hotels
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
