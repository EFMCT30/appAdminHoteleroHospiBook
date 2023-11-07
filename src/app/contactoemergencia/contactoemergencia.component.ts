import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Profileservice } from '../service/profile.service';
import { User } from '../../Entity/Usuario';
import Swal from 'sweetalert2';
import { ClienteEmergencia } from 'src/Entity/UsuarioClienteEmergencia';
import { Cliente } from 'src/Entity/UsuarioCliente';


@Component({
  selector: 'app-contactoemergencia',
  templateUrl: './contactoemergencia.component.html',
  styleUrls: ['./contactoemergencia.component.css']
})
export class ContactoemergenciaComponent implements OnInit {

  profile: any[] = [];
  token: string | null = null;
  profileDataEmergency: ClienteEmergencia = new ClienteEmergencia(0,"","","","","",new Cliente(0,"","","",new Date,false,"",new User(0, '', '', '', [])));

  constructor(
    private axiosEmergencyservice: Profileservice,
    private tokenService: TokenService) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  crearInfoEmergencia() {
    if (this.token !== null) {
      // Reemplaza "Cliente" con el ID del cliente, por ejemplo, this.profileDataEmergency.cliente.id
      const clienteId = this.profileDataEmergency.clienteId.clienteId;
      this.axiosEmergencyservice.createClientEmergencyContact(this.token, clienteId, this.profileDataEmergency)
        .subscribe(
          (response) => {
            // Manejar la respuesta exitosa aquí
            console.log('Información de emergencia creada:', response);
            // Puedes mostrar un mensaje de éxito o redirigir al usuario a otra página
            Swal.fire('Éxito', 'La información de emergencia se ha creado correctamente', 'success');
          },
          (error) => {
            // Manejar errores aquí
            console.error('Error al crear información de emergencia:', error);
            // Muestra un mensaje de error al usuario
            Swal.fire('Error', 'Ha ocurrido un error al crear la información de emergencia', 'error');
          }
        );
    } else {
      // Manejar el caso en que el token sea nulo
      console.error('El token es nulo. No se puede crear la información de emergencia.');
      // Muestra un mensaje de error al usuario o redirige a una página de inicio de sesión, según tu lógica.
    }
  }


}
