import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelserviceService {
  private ruta: string = 'http://localhost:8081';

  constructor() {}

  // Add a method to get hotels by passing the token
  public getHotels(token: string): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .get(`${this.ruta}/hoteles`, {
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

  //Registro Hotel

  public addHotel(token: string, newHotelData: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .post(`${this.ruta}/hoteles/create`, newHotelData, {
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
  public updateHotel(token: string, hotelId: number, updatedHotelData: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .put(`${this.ruta}/hoteles/${hotelId}`, updatedHotelData, {
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


  //Eliminar un Hotel
  public deleteHotel(token: string, hotelId: number): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .delete(`${this.ruta}/hoteles/${hotelId}`, {
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

  public searchHotelsByInitials(token: string, initials: string): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .get(`${this.ruta}/hoteles/buscarFiltro/${initials}`, {
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
