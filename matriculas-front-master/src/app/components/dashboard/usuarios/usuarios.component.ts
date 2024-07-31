import { Component } from '@angular/core';
import { NuevoUsuario } from '../../../models/nuevo-usuario';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';
// Paginación de lista
import { NgxPaginationModule } from 'ngx-pagination';
// Sweetalert -> para las alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterModule, NgxPaginationModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  usuarioList: NuevoUsuario[] = [];
  usuario: NuevoUsuario = new NuevoUsuario();
  public page!: number;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.authService.lista().subscribe({
      next: (usuario: NuevoUsuario[]) => {
        this.usuarioList = usuario;
      },
      error: (err: Error) => {
        console.log(err);
      }
    });
  }

  borrarRegistro(id_usuario: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.delete(id_usuario).subscribe({
          next: (response: any) => {
            console.log('Usuario eliminado correctamente', response);
            Swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado correctamente.',
              'success'
            );
            this.listarUsuarios();
          },
          error: (error: any) => {
            console.error('Error al eliminar el registro', error);
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el registro.',
              'error'
            );
          }
        });
      }
    });
  }

}
