import { Component } from '@angular/core';
import { EstudianteService } from '../../../../services/estudiante.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Estudiante } from '../../../../models/estudiante';
import { FormBuilder, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estudiante-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './estudiante-new.component.html',
  styleUrl: './estudiante-new.component.css'
})
export class EstudianteNewComponent {

  nombre_estudiante = '';
  cedula_estudiante = '';
  email_estudiante = '';
  edad_estudiante = 0;
  numero_estudiante = '';
  representante = {
    nombre_representante: '',
    cedula_representante: '',
    email_representante: '',
    numero_representante: ''
  };
  direccion = {
    ciudad: '',
    sector: '',
    detalle: ''
  };
  institucion = {
    nombre: '',
    tipo: '',
    nivel: '',
    grado: '',
    jornada: '',
    anoLectivo: '',
  };
  
  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private toastr: ToastrService,
    private router: Router
  ) { }



  Create(): void {
    if (this.cedula_estudiante.length < 10 ||
      this.numero_estudiante.length < 10 ||
      this.representante.cedula_representante.length < 10 ||
      this.representante.numero_representante.length < 10) {
      this.toastr.warning('La cédula, los números de teléfono deben tener exactamente 10 caracteres y el año lectivo debe estar en el formato YYYY-YYYY', 'Alerta', {
        timeOut: 1000, positionClass: 'toast-top-center',
      });
      return;
    }
    const estudiante = new Estudiante();
    estudiante.nombre_estudiante = this.nombre_estudiante;
    estudiante.cedula_estudiante = this.cedula_estudiante;
    estudiante.email_estudiante = this.email_estudiante;
    estudiante.edad_estudiante = this.edad_estudiante;
    estudiante.numero_estudiante = this.numero_estudiante;
    estudiante.representante = this.representante;
    estudiante.direccion = this.direccion;
    estudiante.institucion = this.institucion;

    this.estudianteService.createEstudiante(estudiante).subscribe(
      (data: any) => {
        this.toastr.success(data.message, 'Estudiante creado exitosamente', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.volver();
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Warning', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/dashboard/estudiante']);
  }
}
