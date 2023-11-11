import { Cliente } from "./UsuarioCliente";

export class ClienteEmergencia {
    emergencyContactId!: number;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    relationship: string;
    address: string;
    clienteId: Cliente; // Esto podría ser el ID del cliente al que pertenece
  
    constructor(
      emergencyContactId: number,
      contactName: string,
      contactPhone: string,
      contactEmail: string,
      relationship: string,
      address: string,
      clienteId: Cliente
       // Agrega el parámetro del usuario
    ) {
      this.emergencyContactId = emergencyContactId;
      this.contactName = contactName;
      this.contactPhone = contactPhone;
      this.contactEmail = contactEmail;
      this.relationship = relationship;
      this.address = address;
      this.clienteId = clienteId;
       // Asigna el usuario a la propiedad user
    }
  }
  