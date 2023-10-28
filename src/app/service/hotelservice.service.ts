import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from 'src/Entity/Hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelserviceService {

  ruta: string ="http://localhost:8081"

  constructor(private http: HttpClient) { }

  public Gethoteles():Observable<Hotel[]>{
    return this.http.get<Hotel[]>(this.ruta+"/hoteles")
  }

}
