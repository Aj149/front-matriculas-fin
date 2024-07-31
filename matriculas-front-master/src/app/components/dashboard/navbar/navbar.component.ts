import { Component, inject } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLogged = true;
  isAdmin = true;
  nombres_usuario = '';

  private tokenService: TokenService = inject(TokenService);


  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged() ? true : this.isLogged = false;
    this.isAdmin = this.tokenService.isAdmin() ?? false;
    this.nombres_usuario = this.tokenService.getInfoUser() ?? ''
  }

  logOut(): void {
    this.tokenService.logOut();
  }

}
