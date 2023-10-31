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
}
