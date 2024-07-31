import { Component } from '@angular/core';
import { Estudiante } from '../../../../models/estudiante';
import { EstudianteService } from '../../../../services/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
// Sweetalert -> para las alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './estudiante-edit.component.html',
  styleUrl: './estudiante-edit.component.css',
})
export class EstudianteEditComponent {
  estudiante: Estudiante = {
    nombre_estudiante: '',
    cedula_estudiante: '',
    email_estudiante: '',
    edad_estudiante: 0,
    numero_estudiante: '',
    representante: {
      nombre_representante: '',
      cedula_representante: '',
      email_representante: '',
      numero_representante: '',
    },
    direccion: {
      ciudad: '',
      sector: '',
      detalle: '',
    },
    institucion: {
      nombre: '',
      tipo: '',
      nivel: '',
      grado: '',
      jornada: '',
      anoLectivo: ''
    },
  };

  constructor(
    private estudianteService: EstudianteService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id_estudiante = this.activatedRoute.snapshot.params['id_estudiante'];
    this.estudianteService.getEstudianteDetail(id_estudiante).subscribe(
      (data: any) => {
        this.estudiante = data;
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
  }

  Update(): void {
    if (this.estudiante.cedula_estudiante.length < 10 ||
      this.estudiante.numero_estudiante.length < 10 ||
      this.estudiante.representante.cedula_representante.length < 10 ||
      this.estudiante.representante.numero_representante.length < 10) {
      this.toastr.warning('La cédula y los números de teléfono deben tener exactamente 10 caracteres', 'Alerta', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      return;
    }
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas editar este estudiante?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const id_estudiante = this.activatedRoute.snapshot.params['id_estudiante'];
        this.estudianteService.updateEstudiante(id_estudiante, this.estudiante).subscribe(
          (data: any) => {
            this.toastr.success(data.message, 'Estudiante editado correctamente', {
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
    this.router.navigate(['/dashboard/estudiante']);
  }
}
