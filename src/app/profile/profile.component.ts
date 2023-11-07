import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { ProfileserviceService } from '../service/profile.service';
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
  profileData: Cliente = new Cliente(0, '', '', '', '', new Date(), false, '', new User(0, '', '', '', []));

  constructor(
    private axiosProfileservice: ProfileserviceService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
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
          let errorMessage = 'Hubo un problema al actualizar el cliente, por favor intenta de nuevo.';
          if (error.response && error.response.data) {
            errorMessage = error.response.data; // Asignar el mensaje de error del servidor
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el cliente',
            text: errorMessage,
          });
        }
      );
    }
  }


}
