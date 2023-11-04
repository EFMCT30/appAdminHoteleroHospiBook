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

  public getHabitacion(token: string): Observable<any> {
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

<<<<<<< HEAD
  
=======

>>>>>>> 1404c3c0bff74744af0a9914ef49b021f8735561
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

<<<<<<< HEAD
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

  //actulizar
  public updateHabitacion(token: string, habitacionId: number, updatedHabitacionData: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .put(`${this.ruta}/habitaciones/${habitacionId}`, updatedHabitacionData, {
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



  
=======
>>>>>>> 1404c3c0bff74744af0a9914ef49b021f8735561
}
