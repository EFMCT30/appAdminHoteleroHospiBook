export class Habitacion {
  constructor(
    public habitacionId: number,
    public numeroHabitacion: number,
    public tipo: string,
    public capacidad: number,
    public precioNoche: number,
    public disponible: boolean,
    public fechaUltimaMantenimiento: Date,
    public hotelId: number
  ) {}
}
