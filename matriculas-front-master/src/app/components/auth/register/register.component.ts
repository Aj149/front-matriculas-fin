import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from '../../../models/nuevo-usuario';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../dashboard/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [FormsModule, NavbarComponent, CommonModule, RouterLink]
})
export class RegisterComponent {

  usuario: NuevoUsuario = new NuevoUsuario();
  isLogged = true;
  isAdmin = true;
  nombres_usuario = '';
  cedula = '';
  password = '';
  hide= true;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged() ? true : this.isLogged = false;
    this.isAdmin = this.tokenService.isAdmin() ?? false;
  }

  onRegister(): void {
    if (this.usuario.cedula.length < 10) {
      this.toastrService.warning('La cédula debe tener exactamente 10 caracteres', 'Alerta', {
        timeOut: 2000, positionClass: 'toast-top-center',
      });
      return;
    }

    this.authService.registro(this.usuario).subscribe(
      data => {
        this.toastrService.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/dashboard/usuarios']);
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
