import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { ReservaService } from '../../service/reserva.service';
import { Usuario } from '../../../Entity/Usuario';
import { Reserva } from '../../../Entity/Reserva';
import { Cliente } from '../../../Entity/UsuarioCliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  reserva: any[] = [];
  token: string | null = null;
  reservaData: Reserva = new Reserva(new Cliente(1,"","","",new Date,false,"",new Usuario(4, '', '', '', [])),0,new Date(),new Date(),'Pendiente',0,0,new Date(),'');

  constructor(
    private axiosReservaService: ReservaService,
    private tokenService: TokenService
  ) {}
  
  getFormattedCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 16);
  }
  
  createReserva() {
   
    const camposVacios: string[] = [];
    const camposInvalidos: string[] = [];
    
    if (!this.reservaData.fechaInicio || this.reservaData.fechaInicio instanceof Date && isNaN(this.reservaData.fechaInicio.getTime())) {
      camposVacios.push('Fecha Inicio no válida');
      // Aquí puedes mostrar un mensaje de error, lanzar una excepción o realizar otra acción apropiada
  }

  // Validación para fechaFin
  if (!this.reservaData.fechaFin || this.reservaData.fechaFin instanceof Date && isNaN(this.reservaData.fechaFin.getTime())) {
      camposVacios.push('Fecha Fin no válida');
      // Aquí puedes mostrar un mensaje de error, lanzar una excepción o realizar otra acción apropiada
  }

    if (!this.reservaData.idhabitacion) {
      camposVacios.push('Habitacion');
    }
    if (!this.reservaData.precioTotal) {
      camposVacios.push('Precio');
    }
    if (!this.reservaData.comentarios) {
      camposVacios.push('Comentarios');
    } else if (!/^.{20,50}$/.test(this.reservaData.comentarios)) {
      camposInvalidos.push('Comentarios (debe tener entre 20 y 50 caracteres.)');
    }
    

    if (camposVacios.length > 0 || camposInvalidos.length > 0) {
      let mensajeError = '';
      if (camposVacios.length > 0) {
        mensajeError += `Los siguientes campos son obligatorios y deben completarse: ${camposVacios.join(', ')}. `;
      }
      if (camposInvalidos.length > 0) {
        mensajeError += `Los siguientes campos tienen formato inválido: ${camposInvalidos.join(', ')}.`;
      }

      Swal.fire({
        icon: 'error',
        title: 'Campos inválidos u obligatorios',
        text: mensajeError,
      });

      return;
    }

    const token = this.tokenService.getToken();
    if (!token) {
      console.log('No hay un token válido.');
      return;
    }

    // Verificar si la reserva es válida para crearse
    if (!this.esReservaValidaParaCreacion()) {
      console.log('No se puede crear la reserva.');
      return;
    }

    // Crear la reserva si pasa las validaciones
    this.axiosReservaService.createReserva(token, this.reservaData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: '¡Reserva Creada!',
          showConfirmButton: false,
          timer: 1500,
        });
        // Puedes actualizar o hacer algo con la respuesta aquí si es necesario
      },
      (error) => {
        console.error('Error al crear reserva:', error);
        let mensajeError = 'Hubo un problema al crear reserva, por favor intenta de nuevo.';
        if (error.response && error.response.data) {
          mensajeError = error.response.data; // Asignar el mensaje de error del servidor
          console.log(this.reservaData);
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la reserva',
          text: mensajeError,
        });
      }
    );
  }

  // Verificar si la reserva es válida para crearse
  private esReservaValidaParaCreacion(): boolean {
    return this.reservaData.reservaId === 0; // Solo permitir la creación si el ID de la reserva es 0 (nuevo)
  }
  

}
