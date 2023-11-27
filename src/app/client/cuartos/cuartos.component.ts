import { Component, OnInit } from '@angular/core';
import {CuartoService} from "../../service/cuarto.service";


@Component({
  selector: 'app-cuartos',
  templateUrl: './cuartos.component.html',
  styleUrls: ['./cuartos.component.css']
})
export class CuartosComponent implements OnInit{
  habitaciones: any[] = [];

  constructor(private cuartosService: CuartoService) {}

  ngOnInit(): void {
    this.cuartosService.getHabitaciones().subscribe(
      habitaciones => this.habitaciones = habitaciones,
      error => console.error('Error fetching habitaciones:', error)
    );
  }
}
