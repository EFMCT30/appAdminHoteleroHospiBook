import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Profileservice } from '../service/profile.service';
import { User } from '../../Entity/Usuario';
import { Cliente } from '../../Entity/UsuarioCliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  profile: any[] = [];
  token: string | null = null;
  profileData: Cliente = new Cliente(0, '', '', '', new Date(), false, '', new User(0, '', '', '', []));

  constructor(
    private axiosProfileservice: Profileservice,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    console.log(this.token);
    if (this.token) {
      this.axiosProfileservice.getUserInfo(this.token).subscribe(
        (data) => {
          this.profileData = data;
        },
        (error) => {
          console.error('Error al obtener información del perfil del usuario:', error);
        }
      );
    } else {
      console.error('Token es nulo o inválido. No se puede obtener la información del perfil.');
    }
  }

  updateClient() {
    const camposVacios: string[] = [];
    const camposInvalidos: string[] = [];
  
    // Verifica si algún campo obligatorio está vacío o contiene solo espacios en blanco
    if (!this.profileData.nombre) {
      camposVacios.push('Nombre');
    }
    if (!this.profileData.telefono) {
      camposVacios.push('Teléfono');
    } else if (!/^\d{9}$/.test(this.profileData.telefono)) {
      camposInvalidos.push('Teléfono (debe tener 9 dígitos)');
    }
    if (!this.profileData.direccion) {
      camposVacios.push('Dirección');
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
  
    if (this.token && this.profileData.clienteId !== 0) {
      this.axiosProfileservice.updateClientInfo(this.token, this.profileData).subscribe(
        (response) => {
          console.log('Cliente actualizado:', response);
          Swal.fire({
            icon: 'success',
            title: '¡Cliente actualizado!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.error('Error al actualizar el cliente:', error);
          console.log(error);
          let mensajeError = 'Hubo un problema al actualizar el cliente, por favor intenta de nuevo.';
          if (error.response && error.response.data) {
            mensajeError = error.response.data; // Asignar el mensaje de error del servidor
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el cliente',
            text: mensajeError,
          });
        }
      );
    }
  }
  
  
}
