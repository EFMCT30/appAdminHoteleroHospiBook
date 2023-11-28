import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva.service';
import { TokenService } from '../service/token.service';
import { Reserva } from 'src/Entity/Reserva';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {

  reserva: any[] = [];
  token: string | null = null;

  constructor(
    private axiosReserva: ReservaService,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    if (this.token) {
      this.axiosReserva.getReservas(this.token).subscribe(
        (Reservas) => {
          this.reserva = Reservas;
          console.log(this.reserva);
        },
        (error) => {
          console.error('Error fetching hotels:', error);
        }
      );
    }
  }

}
