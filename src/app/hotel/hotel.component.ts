import { Component, OnInit } from '@angular/core';
import { HotelserviceService } from '../service/hotelservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  hotel: any;

  constructor(private h: HotelserviceService, private router:Router){}

  ngOnInit(): void {
    this.h.Gethoteles().subscribe( hoteles => {
      this.hotel = hoteles;
    })
  }
}
