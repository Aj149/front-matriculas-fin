import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BuscadorEstudiantePipe } from '../../../pipes/buscador-estudiante.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, FormsModule, BuscadorEstudiantePipe, CommonModule],
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  estudiante: Estudiante[] = [];
  listaVacia: string | undefined;
  public page!: number;
  nombre = '';
  cedula = '';

  constructor(private estudianteService: EstudianteService) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.estudianteService.getAllEstudiante().subscribe(
      (data: Estudiante[]) => {
        this.estudiante = data;
        this.listaVacia = undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes estudiantes';
      }
    );
  }

  borrar(id_estudiante: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar al estudiante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudianteService.deleteEstudiante(id_estudiante).subscribe({
          next: (response: any) => {
            Swal.fire('Eliminado!', 'El estudiante ha sido eliminado correctamente.', 'success');
            this.cargarEstudiantes();
          },
          error: (error: any) => {
            Swal.fire('Error!', 'Hubo un problema al eliminar al estudiante.', 'error');
          }
        });
      }
    });
  }

  isNumberKey(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode !== 0 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }
}

