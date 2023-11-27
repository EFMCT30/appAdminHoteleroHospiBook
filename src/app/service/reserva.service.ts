import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private ruta: string = 'http://localhost:8081';

  constructor() { }

  createReserva(token: string, reservaDTO: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .post(`${this.ruta}/reservas/crearReserva`, reservaDTO, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

}
