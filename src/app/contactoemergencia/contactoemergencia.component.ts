import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Profileservice } from '../service/profile.service';
import { ClienteEmergencia } from 'src/Entity/UsuarioClienteEmergencia';
import { User } from '../../Entity/Usuario';
import { Cliente } from '../../Entity/UsuarioCliente';

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

  // Otros métodos en tu componente
}