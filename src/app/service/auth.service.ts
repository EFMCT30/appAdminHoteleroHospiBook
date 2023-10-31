import { Injectable } from '@angular/core';
import { TokenService } from './token.service'; // Import your token service

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private tokenService: TokenService) {}

  // Log out the user and clear the token
  logout(): void {
    this.tokenService.removeToken(); // Implement this method in your TokenService
    // You can also perform other logout actions if needed, like redirecting to the login page.
  }
}

