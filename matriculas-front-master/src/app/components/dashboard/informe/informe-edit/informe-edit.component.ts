import { Component, OnInit } from '@angular/core';
import { InformeModel, NuevoInforme } from '../../../../models/informe';
import { InformeService } from '../../../../services/informe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
// Sweetalert -> para las alertas
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { NuevoUsuario } from '../../../../models/nuevo-usuario';
import { TokenService } from '../../../../services/token.service';

@Component({
  selector: 'app-informe-edit',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './informe-edit.component.html',
  styleUrl: './informe-edit.component.css'
})
export class InformeEditComponent implements OnInit {

  info:  NuevoInforme  = new  NuevoInforme();
  usuariosList: NuevoUsuario[] = [];
  isAdmin: boolean = true;

  constructor(
    private informeService: InformeService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private usuarioService: AuthService,
    private token: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin()?? false;
    const id = this.activatedRoute.snapshot.params["id_informe"];
    this.informeService.detail(id).subscribe(
      (data:  any ) => {
        this.info = data;
      },
      (err) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
        this.volver();
      }
    )
    this.cargarUsuarios();
  }



  cargarUsuarios(): void {
    const esAdmin = false;

    this.usuarioService.lista().subscribe(
      (data: NuevoUsuario[]) => {
        if (esAdmin) {
          this.usuariosList = data;
        } else {
          this.usuariosList = data.filter(
            (usuario) => !this.esAdministrador(usuario)
          );
        }
      },
      (error: any) => {

      }
    );
  }

  esAdministrador(usuario: NuevoUsuario): boolean {
    return usuario.roles.some((rol) => rol.rolNombre === 'admin');
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params["id_informe"];
    if (this.info !== null) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres actualizar el informe?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.informeService.update(id, this.info).subscribe({
            next: (data: any) => {
              this.toastr.success('Actualizado correctamente', 'OK', {
                timeOut: 1000, positionClass: 'toast-top-center'
              });
              this.router.navigate(['/dashboard/informe']);
            },
            error: (err: any) => {
              this.toastr.error(err.error.message, 'Fail', {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
            }
          });
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/dashboard/informe']);
  }
}
