import { Component, OnInit } from '@angular/core';
import { InformeService } from '../../../services/informe.service';
import { TokenService } from '../../../services/token.service';
import { FormsModule } from '@angular/forms';
import { BuscadorInformePipe } from '../../../pipes/buscador-informe.pipe';
import { RouterModule } from '@angular/router';
// Paginación de lista
import { NgxPaginationModule } from 'ngx-pagination';
// Sweetalert -> para las alertas
import Swal from 'sweetalert2';
import { NuevoUsuario } from '../../../models/nuevo-usuario';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { InformeModel } from '../../../models/informe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informe',
  standalone: true,
  imports: [CommonModule,FormsModule, BuscadorInformePipe, RouterModule, NgxPaginationModule],
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  nombre = '';
  fecha: string = '';  // Nueva propiedad para la fecha
  isAdmin: boolean = true;
  public page!: number;

  informeList: InformeModel[] = [];
  usuarios: NuevoUsuario[] = [];
  idUser: number = 0;

  constructor(
    private informeService: InformeService,
    private usuarioService: AuthService,
    private toaster: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.idUser = Number(this.tokenService.getUserId());
    this.isAdmin = this.tokenService.isAdmin() ?? false;
    if (this.isAdmin) {
      this.listarInformes();
    } else {
      if (this.idUser) {
        this.getInformesByUsuario(this.idUser);
      } else {
        this.toaster.error("Error al obtener el usuario");
      }
    }
    this.cargarUsuarios();
  }

  listarInformes(): void {
    this.informeService.lista().subscribe({
      next: (informe: InformeModel[]) => {
        this.informeList = informe;
      },
      error: (err: Error) => {
        console.log(err);
      }
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.lista().subscribe(
      (data: NuevoUsuario[]) => {
        this.usuarios = data;
      },
      (error: any) => {
        this.toaster.error('Error al cargar los usuarios');
      }
    );
  }

  getInformesByUsuario(idUsuario: number): void {
    this.informeService.getInformesByUsuario(idUsuario).subscribe({
      next: (info: InformeModel[]) => {
        this.informeList = info;
      },
      error: (err: any) => {
        this.toaster.error(err, "Error al obtener informes");
      }
    });
  }

  borrarInforme(id_informe: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar el informe?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.informeService.delete(id_informe).subscribe({
          next: (response: any) => {
            console.log('Informe eliminado correctamente', response);
            Swal.fire(
              'Eliminado!',
              'El informe ha sido eliminado correctamente.',
              'success'
            );
            this.listarInformes();
          },
          error: (error: any) => {
            console.error('Error al eliminar el informe', error);
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el informe.',
              'error'
            );
          }
        });
      }
    });
  }
}