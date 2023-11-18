import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';
import { Usuario, Role } from '../../Entity/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.css']
})
export class UsercreateComponent {
  userRegistrationForm: FormGroup;
  user: any[] = [];
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private axiosUserService: UserService,
    private tokenService: TokenService

    ) {
    this.userRegistrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['USER', Validators.required], // Set default value to 'USER'

    });
  }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    if (this.token) {
      this.axiosUserService.getAllUser(this.token).subscribe(
        (users) => {
          this.user = users;
        },
        (error) => {
          console.error('Error fetching Users:', error);
        }
      );
    }
  }

  testTokenValidity() {
    this.axiosUserService.getAllUser(this.token!).subscribe(
      (response) => {
        console.log('Respuesta de prueba:', response);
        // Aquí puedes hacer algo con la respuesta si es necesaria
      },
      (error) => {
        console.error('Error en la prueba de token:', error);
        // Muestra algún mensaje o realiza una acción en caso de error
      }
    );
  }

  // addNewUser() {
  //   // Verifica si hay un token
  //   if (this.token) {
  //     this.axiosUserService.addUser(this.token, this.newUser).subscribe(
  //       (response) => {
  //         console.log('Nuevo Usuario registrado:', response);
  //         this.user.push(response);
  //         this.newUser = new User(0, '', '', '', []);
  //
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Usuario añadido!',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       },
  //       (error) => {
  //         console.error('Error al registrar el nuevo usuario:', error);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error al añadir el usuario',
  //           text: 'Hubo un problema al registrar el USUARIO, por favor intenta de nuevo.',
  //         });
  //       }
  //     );
  //   } else {
  //     // Muestra un mensaje al usuario indicando que no hay token
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Token no disponible',
  //       text: 'No se ha proporcionado un token válido para realizar la operación.',
  //     });
  //   }
  // }


  addNewUser() {
    // Verifica si hay un token
    if (this.token) {
      // Verifica si el formulario es válido
      if (this.userRegistrationForm.valid) {
        // Obtén los valores del formulario
        const formData = this.userRegistrationForm.value
        // Access the selected role from the form value
        const selectedRole = formData.role;

        // Crea un nuevo objeto User con los valores del formulario
        const newUser: Usuario = new Usuario(0, formData.email, formData.password, formData.username, [selectedRole]);

        // Llama al servicio para agregar el nuevo usuario
        this.axiosUserService.addUser(this.token, newUser).subscribe(
          (response) => {
            console.log('Nuevo Usuario registrado:', response);
            this.user.push(response);
            // Reinicia el formulario después de agregar el usuario
            this.userRegistrationForm.reset();

            Swal.fire({
              icon: 'success',
              title: 'Usuario añadido!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error) => {
            console.error('Error al registrar el nuevo usuario:', error);
            console.log(this.token);
            Swal.fire({
              icon: 'error',
              title: 'Error al añadir el usuario',
              text: 'Hubo un problema al registrar el USUARIO, por favor intenta de nuevo.'+error ,
            });
          }
        );
      } else {
        // Muestra un mensaje al usuario indicando que el formulario no es válido
        Swal.fire({
          icon: 'error',
          title: 'Formulario no válido',
          text: 'Por favor, completa todos los campos correctamente.',
        });
      }
    } else {
      // Muestra un mensaje al usuario indicando que no hay token
      Swal.fire({
        icon: 'error',
        title: 'Token no disponible',
        text: 'No se ha proporcionado un token válido para realizar la operación.',
      });
    }
  }



  getAllUsers() {
    if (this.token !== null) {
      this.axiosUserService.getAllUser(this.token).subscribe(
        (users) => {
          this.user = users;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    } else {
      console.error('Token is null');
    }
  }

  deleteUser(userId: number) {
    if (this.token !== null) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, ¡elimínalo!',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.token !== null) {
            this.axiosUserService.deleteUser(this.token, userId).subscribe(
              (response) => {
                console.log('Usuario eliminado ID:', userId);
                this.getAllUsers();
              },
              (error) => {
                console.error('Error al eliminar el Usuario:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error al eliminar el usuario',
                  text: 'Hubo un problema al eliminar el usuario, por favor intenta de nuevo.',
                });
              }
            );
          }
        }
      });
    } else {
      console.error('Token is null');
    }
  }



  onSubmit() {
    if (this.userRegistrationForm.valid) {
      const formData = this.userRegistrationForm.value;
    }
  }
}
