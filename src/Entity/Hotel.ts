export class Hotel {
    hotelId: number;
    nombre: string;
    direccion: string;
    telefono: string;
    estrellas: number;
    descripcion: string;
    fechaConstruccion: Date;
    categoria: string
  
    constructor(hotelId: number, nombre:string ,direccion: string, telefono: string, estrellas: number, descripcion: string, fechaConstruccion: Date, categoria: string) {
      this.hotelId = hotelId;
      this.nombre = nombre;
      this.direccion= direccion;
      this.telefono = telefono;
      this.estrellas = estrellas;
      this.descripcion = descripcion;
      this.fechaConstruccion = fechaConstruccion;
      this.categoria = categoria;
    }
  }