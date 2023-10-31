import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Add an error message property

  constructor(private router: Router) {}

  login() {
    // Define your backend login URL
    const loginUrl = 'http://localhost:8081/login';

    // Prepare the data to send to the server as JSON
    const data = {
      username: this.username,
      password: this.password
    };

    // Send a POST request to the login endpoint with JSON data
    axios
      .post(loginUrl, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const token = response.headers['authorization'];
        localStorage.setItem('token', token);
        console.log('Token:', token);
        this.router.navigate(['/profile']);
      })
      .catch((error) => {
        // Handle login errors
        if (error.response && error.response.status === 404) {
          this.errorMessage = 'User not found. Please check your credentials.';
        } else {
          this.errorMessage = 'Login failed. An error occurred.';
          console.error('Login failed:', error);
        }
      });
  }
}
