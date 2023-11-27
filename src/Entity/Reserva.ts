import { Cliente } from "./UsuarioCliente";

export class Reserva {
    clienteId: Cliente;
    reservaId: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
    idhabitacion: number;
    precioTotal: number;
    fechaCreacion: Date;
    comentarios: string;


    constructor(
      clienteId: Cliente,
      reservaId: number,
      fechaInicio: Date,
      fechaFin: Date,
      estado: string,
      idhabitacion: number,
      precioTotal: number,
      fechaCreacion: Date,
      comentarios: string,
      
    ) {
      this.clienteId = clienteId;
      this.reservaId = reservaId;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.estado = estado;
      this.idhabitacion = idhabitacion;
      this.precioTotal = precioTotal;
      this.fechaCreacion = fechaCreacion;
      this.comentarios = comentarios;
    }
  }
  
