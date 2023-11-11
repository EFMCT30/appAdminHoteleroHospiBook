import { User } from '../Entity/Usuario';

export class Cliente {
  clienteId: number;
  nombre: string;
  telefono: string;
  direccion: string;
  fechaRegistro: Date;
  activo: boolean;
  preferencias: string;
  user: User; // Referencia al usuario

  constructor(
    clienteId: number,
    nombre: string,
    telefono: string,
    direccion: string,
    fechaRegistro: Date,
    activo: boolean,
    preferencias: string,
    user: User // Agrega el parámetro del usuario
  ) {
    this.clienteId = clienteId;
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
    this.fechaRegistro = fechaRegistro;
    this.activo = activo;
    this.preferencias = preferencias;
    this.user = user; // Asigna el usuario a la propiedad user
  }
}
