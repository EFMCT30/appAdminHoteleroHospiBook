import axios from 'axios';
import {Habitacion} from "../../Entity/Habitacion";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private ruta: string = 'http://localhost:8081';

  constructor() {}

  public getHabitaciones(token: string): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .get(`${this.ruta}/habitaciones`, {
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

  public createHabitacion(token: string, nuevaHabitacion: Habitacion): Observable<any> {
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    return new Observable<any>((observer) => {
      axios
        .post(`${this.ruta}/habitaciones/create`, nuevaHabitacion, { headers })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  public deleteHabitacion(token: string, habitacionId: number): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .delete(`${this.ruta}/habitaciones/${habitacionId}`, {
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
