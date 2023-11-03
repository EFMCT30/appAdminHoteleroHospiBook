export class Habitacion {
  constructor(

    public numeroHabitacion: number,
    public tipo: string,
    public capacidad: number,
    public precioNoche: number,
    public disponible: boolean,
    public fechaUltimaMantenimiento: string,
    public hotelId: number
  ) {}
}
