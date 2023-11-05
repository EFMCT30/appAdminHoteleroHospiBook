import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileserviceService {

  private ruta: string = 'http://localhost:8081';

  constructor() { }

  public getUsers(token: string): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .get(`${this.ruta}/cliente/listarClientes`, {
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

  public getUserInfoById(token: string, userId: number): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .get(`${this.ruta}/cliente/${userId}`, {
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

  updateClientInfo(token: string, userId: number, clienteUpdateDTO: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .put(`${this.ruta}/updateClientInfo/${userId}`, clienteUpdateDTO, {
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
