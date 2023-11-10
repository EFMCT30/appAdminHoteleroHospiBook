import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Profileservice {

  private ruta: string = 'http://localhost:8081';

  constructor() { }

  // public getUsers(token: string): Observable<any> {
  //   return new Observable<any>((observer) => {
  //     axios
  //       .get(`${this.ruta}/cliente/listarClientes`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         observer.next(response.data);
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       });
  //   });
  // }

  // public getUserInfoById(token: string, userId: number): Observable<any> {
  //   return new Observable<any>((observer) => {
  //     axios
  //       .get(`${this.ruta}/cliente/${userId}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         observer.next(response.data);
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       });
  //   });
  // }

  getUserInfo(token: string): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .get(`${this.ruta}/cliente/userInfo`, {
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

  updateClientInfo(token: string, clienteUpdateDTO: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .put(`${this.ruta}/cliente/updateClientInfo`, clienteUpdateDTO, {
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


////Información de emergencia dl cliente

getUserInfoContact(token: string): Observable<any> {
  return new Observable<any>((observer) => {
    axios
      .get(`${this.ruta}/cliente/userInfoContact`, {
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

updateEmergencyInfo(token: string, clienteUpdateDTO: any): Observable<any> {
  return new Observable<any>((observer) => {
    axios
      .put(`${this.ruta}/cliente/updateEmergencyContact`, clienteUpdateDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        console.error('Error en la solicitud HTTP:', error);
        observer.error(error);
      });
  });
}


}
