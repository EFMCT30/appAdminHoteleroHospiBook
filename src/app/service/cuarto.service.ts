import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuartoService {

  private ruta: string = 'http://localhost:8081';

  // private apiUrl = '/habitaciones';

  constructor() {}

  getHabitaciones(): Observable<any[]> {
    return new Observable<any[]>(observer => {
      axios.get(`${this.ruta}/habitaciones`)
        .then(response => {
          observer.next(response.data);
          observer.complete();
          console.log(response.data)
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
  }
