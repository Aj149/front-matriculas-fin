import { Component } from '@angular/core';
import { Matricula, Programacion } from '../../../../models/matricula';
import { NuevoUsuario } from '../../../../models/nuevo-usuario';
import { Estudiante } from '../../../../models/estudiante';
import { MatriculaService } from '../../../../services/matricula.service';
import { EstudianteService } from '../../../../services/estudiante.service';
import { AuthService } from '../../../../services/auth.service';
import { MateriaService } from '../../../../services/materia.service';
import { NuevaMateria } from '../../../../models/materia';
import { Horario } from '../../../../models/horario';
import { HorarioService } from '../../../../services/horario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterByModalidadPipe } from '../../../../pipes/modalidad_matricula.pipe';

@Component({
  selector: 'app-matricula-new',
  standalone: true,
  imports: [FormsModule, FilterByModalidadPipe],
  templateUrl: './matricula-new.component.html',
  styleUrls: ['./matricula-new.component.css'],
})
export class MatriculaNewComponent {
  matricula: Matricula = new Matricula();
  usuarios: NuevoUsuario[] = [];
  estudiantes: Estudiante[] = [];
  materias: NuevaMateria[] = [];
  selectedMaterias: number[] = [];
  horarios: Horario[] = [];
  selectedHorarios: number[] = [];

  listaVacia: string | undefined;
  selectedModalidad: string = '';

  constructor(
    private matriculaService: MatriculaService,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private horarioService: HorarioService,
    private usuarioService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarEstudiantes();
    this.cargarMaterias();
    this.cargarHorarios();
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.matricula.fecha = `${yyyy}-${mm}-${dd}`;
  }

  crearMatricula(): void {
    this.matriculaService.save(this.matricula).subscribe(
      (data: any) => {
        this.toastr.success(data.message, 'Matricula Creada con exito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.volver();
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/dashboard/matricula']);
  }

  cargarUsuarios(): void {
    const esAdmin = false;

    this.usuarioService.lista().subscribe(
      (data: NuevoUsuario[]) => {
        if (esAdmin) {
          this.usuarios = data;
        } else {
          this.usuarios = data.filter(
            (usuario) => !this.esAdministrador(usuario)
          );
        }
        this.listaVacia =
          this.usuarios.length === 0 ? 'No tienes usuarios' : undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes usuarios';
      }
    );
  }

  esAdministrador(usuario: NuevoUsuario): boolean {
    return usuario.roles.some((rol) => rol.rolNombre === 'admin');
  }

  cargarEstudiantes(): void {
    this.estudianteService.getAllEstudiante().subscribe(
      (data: Estudiante[]) => {
        this.estudiantes = data;
        this.listaVacia = undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes estudiantes';
      }
    );
  }

  cargarMaterias() {
    this.materiaService.lista().subscribe(
      (data: NuevaMateria[]) => {
        this.materias = data;
        this.listaVacia = undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes materias';
      }
    );
  }

  getMateria(id: number) {
    return this.materias.find((m) => m.id_materia === id);
  }

  onMateriaChange() {
    for (let materiaId of this.selectedMaterias) {
      if (!this.matricula.id_materias.includes(materiaId)) {
        this.matricula.id_materias.push(materiaId);
      }
    }
  }

removeMateriaFromMatricula(materiaId: number) {
  const index = this.matricula.id_materias.indexOf(materiaId);
  if (index !== -1) {
    this.matricula.id_materias.splice(index, 1);
    // Also remove from selectedMaterias to keep the dropdown in sync
    const selectedIndex = this.selectedMaterias.indexOf(materiaId);
    if (selectedIndex !== -1) {
      this.selectedMaterias.splice(selectedIndex, 1);
    }
  }
}

  cargarHorarios() {
    if (this.selectedModalidad === '') {
      this.horarioService.lista().subscribe(
        (data: Horario[]) => {
          this.horarios = data;
          this.listaVacia = undefined;
        },
        (error: any) => {
          this.listaVacia = 'No tienes horarios';
        }
      );
    } else {
      this.horarioService
        .getAllHorariosByModalidad(this.selectedModalidad)
        .subscribe(
          (data: Horario[]) => {
            this.horarios = data;
            this.listaVacia = undefined;
          },
          (error: any) => {
            this.listaVacia = `No hay horarios ${this.selectedModalidad}`;
          }
        );
    }
  }

  removeHorarioFromMatricula(horarioId: number) {
    const index = this.matricula.programacion.horario_id.indexOf(horarioId);
    if (index !== -1) {
      this.matricula.programacion.horario_id.splice(index, 1);
    }
  }

  getHorario(id: number) {
    return this.horarios.find((h) => h.id_horario === id);
  }

  onHorarioChange() {
    if (!this.matricula.programacion) {
      this.matricula.programacion = new Programacion();
      this.matricula.programacion.horario_id = [];
    }
    for (let horarioId of this.selectedHorarios) {
      if (!this.matricula.programacion.horario_id.includes(horarioId)) {
        this.matricula.programacion.horario_id.push(horarioId);
      }
    }
  }
}
