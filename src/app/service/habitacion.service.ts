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

  public getHabitaciones(token: string): Observable<Habitacion[]> {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return new Observable<Habitacion[]>((observer) => {
      axios
        .get<Habitacion[]>(`${this.ruta}/habitaciones`, { headers })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }


  public addHabitacion(token: string, newHabitacionData: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .post(`${this.ruta}/habitaciones/create`, newHabitacionData, {
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
