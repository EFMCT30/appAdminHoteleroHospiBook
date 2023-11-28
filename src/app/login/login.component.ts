import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service'; // Import the TokenService
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private tokenService: TokenService) {}

  login() {

    if (!this.username || !this.password) {
      // Check for empty fields
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Por favor, ingresa tanto el nombre de usuario como la contraseña.',
      });
      return; // Exit the function if fields are empty
    }

    const loginUrl = 'http://localhost:8081/login';
    const data = {
      username: this.username,
      password: this.password,
    };

    axios
      .post(loginUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        const token = response.headers['authorization'];
        this.tokenService.setToken(token); // Store the token using the service
        console.log(token);
        this.router.navigate(['/profile']);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          this.errorMessage = 'User not found. Please check your credentials.';
        } else {
          this.errorMessage = 'Login failed. An error occurred.';
          console.error('Login failed:', error);
        }
      });
  }
}
