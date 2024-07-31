import { Component } from '@angular/core';
import { NuevaMateria } from '../../../models/materia';
import { MateriaService } from '../../../services/materia.service';
import { RouterLink } from '@angular/router';
// Paginación de lista
import { NgxPaginationModule } from 'ngx-pagination';
// Sweetalert -> para las alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule],
  templateUrl: './materia.component.html',
  styleUrl: './materia.component.css'
})
export class MateriaComponent {
  materia: NuevaMateria[] = [];
  listaVacia: string | undefined;
  public page!: number;

  constructor(
    private materiaService: MateriaService,
  ) { }

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias(): void {
    this.materiaService.lista().subscribe(
      (data: NuevaMateria[]) => {
        this.materia = data;
        this.listaVacia = undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes Materias';
      }
    );
  }

  borrar(id_materia: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar la materia?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.materiaService.delete(id_materia).subscribe({
          next: (response: any) => {
            console.log('Materia eliminada correctamente', response);
            Swal.fire(
              'Eliminado!',
              'La materia ha sido eliminada correctamente.',
              'success'
            );
            this.cargarMaterias();
          },
          error: (error: any) => {
            console.error('Error al eliminar la materia', error);
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar la materia.',
              'error'
            );
          }
        })
      }
    });
  }
}
