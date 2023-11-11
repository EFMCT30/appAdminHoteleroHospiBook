import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Profileservice } from '../service/profile.service';
import { ClienteEmergencia } from 'src/Entity/UsuarioClienteEmergencia';
import { User } from '../../Entity/Usuario';
import { Cliente } from '../../Entity/UsuarioCliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactoemergencia',
  templateUrl: './contactoemergencia.component.html',
  styleUrls: ['./contactoemergencia.component.css']
})
export class ContactoemergenciaComponent implements OnInit {
  token: string | null = null;
  profileDataEmergency: ClienteEmergencia = new ClienteEmergencia(0,"","","","","",new Cliente(0,"","","",new Date,false,"",new User(0, '', '', '', [])));


  constructor(
    private axiosProfileservice: Profileservice,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    console.log(this.token);
    if (this.token) {
      this.axiosProfileservice.getUserInfoContact(this.token).subscribe(
        (data) => {
          this.populateClientEmergencyInfo(data); // Cambiar a la función correspondiente
        },
        (error) => {
          console.error('Error al obtener información del contacto de emergencia del cliente:', error);
          // Manejar errores aquí
        }
      );
    } else {
      console.error('Token es nulo o inválido. No se puede obtener la información del contacto de emergencia del cliente.');
    }
  }
  

  populateClientEmergencyInfo(response: any): void {
    // Verifica la estructura y nomenclatura de las claves de 'response' para asegurarte que coincidan con los campos de ClienteEmergencia
    if (response) {
      this.profileDataEmergency = new ClienteEmergencia(
        response.emergencyContactId,
        response.contactName,
        response.contactPhone,
        response.contactEmail,
        response.relationship,
        response.address,
        response.clienteId // Asegúrate de que este campo coincida con la estructura del objeto Cliente
      );
  
      console.log('Contacto de emergencia del cliente:', this.profileDataEmergency);
    } else {
      console.error('No se recibieron datos válidos para el contacto de emergencia del cliente.');
    }
  }
  
  updateEmergency() {
    const camposVacios: string[] = [];
    const camposInvalidos: string[] = [];
  
    // Verifica si algún campo obligatorio está vacío o contiene solo espacios en blanco
    if (!this.profileDataEmergency.contactName.trim()) {
      camposVacios.push('Nombre de Contacto');
    }
    if (!this.profileDataEmergency.contactPhone.trim()) {
      camposVacios.push('Teléfono de Contacto');
    } else if (!/^\d{9}$/.test(this.profileDataEmergency.contactPhone.trim())) {
      camposInvalidos.push('Teléfono de Contacto (debe tener 9 dígitos)');
    }
    if (!this.profileDataEmergency.contactEmail.trim()) {
      camposVacios.push('Correo de Contacto');
    } else if (!/\S+@\S+\.\S+/.test(this.profileDataEmergency.contactEmail.trim())) {
      camposInvalidos.push('Correo de Contacto (formato inválido)');
    }
    if (!this.profileDataEmergency.relationship.trim()) {
      camposVacios.push('Relación');
    }
    if (!this.profileDataEmergency.address.trim()) {
      camposVacios.push('Dirección de Contacto');
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
  
    if (this.token && this.profileDataEmergency.emergencyContactId !== 0) {
      this.axiosProfileservice.updateEmergencyInfo(this.token, this.profileDataEmergency).subscribe(
        (response) => {
          console.log('Contacto de emergencia actualizado:', response);
          Swal.fire({
            icon: 'success',
            title: '¡Contacto de emergencia actualizado!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.error('Error al actualizar el contacto de emergencia:', error);
          console.log(error);
          let mensajeError = 'Hubo un problema al actualizar el contacto de emergencia, por favor intenta de nuevo.';
          if (error.response && error.response.data) {
            mensajeError = error.response.data; // Asignar el mensaje de error del servidor
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el contacto de emergencia',
            text: mensajeError,
          });
        }
      );
    }
  }
  

}