import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token'; // Define a key for the token

  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token); // Store the token in localStorage
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY); // Retrieve the token from localStorage
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY); // Remove the token from localStorage
  }
}
