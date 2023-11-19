import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../service/token.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedInUsername: string | null = null;
  constructor(private authService: AuthService,private router: Router,private axiosUserService: UserService,
    private tokenService: TokenService) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken(); 
    if (token) {
      this.axiosUserService.getUsername(token).subscribe(
        (username) => {
          this.loggedInUsername = username;
          console.log(this.loggedInUsername);
        },
        (error) => {
          console.error('Error al obtener el nombre de usuario:', error);
        }
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to the login page
    // You can also add a redirection to the login page or perform other logout-related actions here.
  }
}
