import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InformeService } from '../../../../services/informe.service';
import { TokenService } from '../../../../services/token.service';
import { Router } from '@angular/router';
import { InformeModel, NuevoInforme } from '../../../../models/informe';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { NuevoUsuario } from '../../../../models/nuevo-usuario';

@Component({
  selector: 'app-informe-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './informe-new.component.html',
  styleUrl: './informe-new.component.css'
})
export class InformeNewComponent implements OnInit {

  estudiante = '';
  fecha: Date = new Date;
  instructor = 0;
  hora = '';
  codigo = '';
  materia = '';
  tema_general = '';
  tema_secundario = '';
  actitud_estudiante = '';
  tareas_enviadas = '';
  bases = '';
  tareas = '';
  evolucion = '';
  hora_fecha_llamada: Date = new Date;
  representante = '';
  observaciones = '';
  realizado_por = '';

  usuariosList: NuevoUsuario[] = [];

  constructor(
    private toastr: ToastrService,
    private informeService: InformeService,
    private tokenService: TokenService,
    private usuarioService: AuthService,
    private router: Router
  ) { }

  isAdmin: boolean = true;

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin() ?? false;
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

  async onCreate(): Promise<void> {
    if (
      !this.estudiante ||
      !this.fecha ||
      !this.instructor ||
      !this.hora ||
      !this.codigo ||
      !this.materia ||
      !this.tema_general ||
      !this.tema_secundario ||
      !this.actitud_estudiante ||
      !this.tareas_enviadas ||
      !this.bases ||
      !this.tareas ||
      !this.evolucion
    ) {
      // Mostrar una alerta indicando que todos los campos son requeridos
      alert('Todos los campos son requeridos');
      return;
    }

    const info = new NuevoInforme();
    info.estudiante = this.estudiante;
    info.fecha = this.fecha;
    info.instructor = this.instructor;
    info.hora = this.hora;
    info.codigo = this.codigo;
    info.materia = this.materia;
    info.tema_general = this.tema_general;
    info.tema_secundario = this.tema_secundario;
    info.actitud_estudiante = this.actitud_estudiante;
    info.tareas_enviadas = this.tareas_enviadas;
    info.bases = this.bases;
    info.tareas = this.tareas;
    info.evolucion = this.evolucion;
    info.hora_fecha_llamada = this.hora_fecha_llamada;
    info.representante = this.representante;
    info.observaciones = this.observaciones;
    info.realizado_por = this.realizado_por;

    this.informeService.save(info).subscribe({
      next: (data: any) => {
        this.toastr.success('Informe creado', 'Ok', {
          timeOut: 1000, positionClass: 'toast-top-center'
        });
        setTimeout(() => {
          this.router.navigate(['/dashboard/informe']);
        }, 2000);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    })
  }

  volver(): void {
    this.router.navigate(['/dashboard/informe']);
  }
}
