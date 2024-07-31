import { Component } from '@angular/core';
import { MatriculaService } from '../../../../services/matricula.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NuevoUsuario } from '../../../../models/nuevo-usuario';
import { Estudiante } from '../../../../models/estudiante';
import {  Horario } from '../../../../models/horario';
import { NuevaMateria } from '../../../../models/materia';
import { AuthService } from '../../../../services/auth.service';
import { EstudianteService } from '../../../../services/estudiante.service';
import { HorarioService } from '../../../../services/horario.service';
import { MateriaService } from '../../../../services/materia.service';
import { FilterByModalidadPipe } from '../../../../pipes/modalidad_matricula.pipe';
import { Matricula, Programacion } from '../../../../models/matricula';


@Component({
  selector: 'app-matricula-edit',
  standalone: true,
  imports: [FormsModule, FilterByModalidadPipe],
  templateUrl: './matricula-edit.component.html',
  styleUrl: './matricula-edit.component.css'
})
export class MatriculaEditComponent {

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
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.matricula.programacion.horario_id = [];
    const id_estudiante = this.activatedRoute.snapshot.params['id_matricula'];
    this.matriculaService.detail(id_estudiante).subscribe(
      (data: any) => {
        this.matricula = data;
        if (!this.matricula.programacion) {
          this.matricula.programacion = new Programacion();
          this.matricula.programacion.horario_id = [];
        }
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
    this.cargarUsuarios();
    this.cargarEstudiantes();
    this.cargarMaterias();
    this.cargarHorarios();
    this.cargarHorariosByMatricula();
    this.cargarMateriasByMatricula();
  }

  cargarHorariosByMatricula(): void {
    const id = this.activatedRoute.snapshot.params['id_matricula'];
    this.matriculaService.getHorariosByMatricula(id).subscribe(
      (data: any) => {
        this.matricula.programacion.horario_id = data;
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  cargarMateriasByMatricula(): void {
    const id = this.activatedRoute.snapshot.params['id_matricula'];
    this.matriculaService.getMateriasByMatricula(id).subscribe(
      (data: any) => {
        this.matricula.id_materias = data;
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  cargarUsuarios(): void {
    const esAdmin = false; // Aquí debes establecer la lógica para determinar si el usuario actual es administrador o no

    this.usuarioService.lista().subscribe(
      (data: NuevoUsuario[]) => {
        if (esAdmin) {
          // Si el usuario es administrador, simplemente asigna todos los usuarios
          this.usuarios = data;
        } else {
          // Si el usuario no es administrador, filtra los usuarios que no son administradores
          this.usuarios = data.filter(usuario => !this.esAdministrador(usuario));
        }
        this.listaVacia = this.usuarios.length === 0 ? 'No tienes usuarios' : undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes usuarios';
      }
    );
  }

esAdministrador(usuario: NuevoUsuario): boolean {
    return usuario.roles.some(rol => rol.rolNombre === 'admin');
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

  cargarMaterias(){
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
      this.horarioService.getAllHorariosByModalidad(this.selectedModalidad).subscribe(
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
    return this.horarios.find(h => h.id_horario === id);
  }

  onHorarioChange() {
    if (!this.matricula.programacion) {
      this.matricula.programacion = { horario_id: [] };
    }
    for (let horarioId of this.selectedHorarios) {
      if (!this.matricula.programacion.horario_id || !this.matricula.programacion.horario_id.includes(horarioId)) {
        if (!this.matricula.programacion.horario_id) {
          this.matricula.programacion.horario_id = [];
        }
        this.matricula.programacion.horario_id.push(horarioId);
      }
    }
  }


  Update(): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas editar esta matricula?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const id_estudiante = this.activatedRoute.snapshot.params['id_matricula'];
        this.matriculaService.update(id_estudiante, this.matricula).subscribe(
          (data: any) => {
            this.toastr.success(data.message, 'Matricula editada correctamente', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.volver();
          },
          (err: any) => {
            this.toastr.error(err.error.message, 'Fail', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }
        );
      }
    });
  }

  volver(): void {
    this.router.navigate(['/dashboard/matricula']);
  }
}
