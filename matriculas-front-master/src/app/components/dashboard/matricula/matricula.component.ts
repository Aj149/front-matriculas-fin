import { Component } from '@angular/core';
import { MatriculaService } from '../../../services/matricula.service';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { FormsModule } from '@angular/forms';
import { BuscadorMatriculaPipe } from '../../../pipes/buscador-matricula.pipe';
import { ToastrService } from 'ngx-toastr';
import { MatriculaId } from '../../../models/view_matricula';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [
    NgxPaginationModule,
    RouterLink,
    FormsModule,
    BuscadorMatriculaPipe,
  ],
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.css',
})
export class MatriculaComponent {
  matriculaList: MatriculaId[] = [];

  public page!: number;
  listaVacia: string | undefined;

  isAdmin: boolean = true;
  searchTerm: string = '';
  idUser: number = 0;

  constructor(
    private matriculaService: MatriculaService,
    private tokenService: TokenService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.idUser = Number(this.tokenService.getUserId());
    this.isAdmin = this.tokenService.isAdmin() ?? false;

    if (this.isAdmin) {
      this.obtenerMatriculas();
    } else {
      if (this.idUser) {
        this.getMatriculasByUsuario(this.idUser);
      } else {
        this.toaster.error('Error al obtener el usuario');
      }
    }
  }

  obtenerMatriculas(): void {
    this.matriculaService.lista().subscribe({
      next: (matricula: MatriculaId[]) => {
        this.matriculaList = matricula;
      },
      error: (err: any) => {
        this.toaster.warning('No existen matriculas');
      },
    });
  }

  getMatriculasByUsuario(idUsuario: number): void {
    this.matriculaService.getMatriculasByUsuario(idUsuario).subscribe({
      next: (matricula: MatriculaId[]) => {
        this.matriculaList = matricula;
      },
      error: (err: any) => {
        this.toaster.warning('No tienes matriculas');
      },
    });
  }

  confirmarEliminar(id_matricula: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta matricula?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.matriculaService.delete(id_matricula).subscribe({
          next: () => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar la matricula.',
              'error'
            );
          },
          error: (fail: any) => {
            Swal.fire(
              'Eliminado!',
              'La matricula ha sido eliminada correctamente.',
              'success'
            );
            this.obtenerMatriculas();
          },
        });
      }
    });
  }
}
