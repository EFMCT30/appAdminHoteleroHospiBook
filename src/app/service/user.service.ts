import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ruta: string = 'http://localhost:8081';

  constructor() { }

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

  deleteUser(token: string, userId: number): Observable<any> {
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
  }


}
