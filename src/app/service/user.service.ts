import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ruta: string = 'http://localhost:8081';

  constructor() { }

  getUsername(token: string): Observable<string> {
    return new Observable<string>((observer) => {
      axios.get<string>(`${this.ruta}/getUsername`, {
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

  getAllUser(token: string): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .get(`${this.ruta}/listUser`, {
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

  public addUser(token: string, newUserData: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .post(`${this.ruta}/createUser`, newUserData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        })
        .then((response) => {
          console.log(response)
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  /*deleteUser(token: string, userId: number): Observable<any> {
    const url = `${this.ruta}/deleteUser?id=${userId}`;
    return new Observable<any>((observer) => {
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          observer.error(error);
        });
    });
  }*/

  deleteUser(token: string, userId: number): Observable<any> {
    const url = `${this.ruta}/deleteUser?userId=${userId}`;
    return new Observable<any>((observer) => {
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          if (error.response) {
            // El servidor respondió con un código de estado diferente de 2xx
            console.error('Server error data:', error.response.data);
            console.error('Server error status:', error.response.status);
            console.error('Server error headers:', error.response.headers);
          } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error('No response received:', error.request);
          } else {
            // Algo sucedió en la configuración de la solicitud que disparó un error
            console.error('Error setting up the request:', error.message);
          }
          observer.error(error);
        });
    });
  }
}
