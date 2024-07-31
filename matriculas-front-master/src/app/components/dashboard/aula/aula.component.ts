import { Component } from '@angular/core';
import { NuevaAula } from '../../../models/aula';
import { AulaService } from '../../../services/aula.service';
import { RouterLink } from '@angular/router';
// Sweetalert -> para las alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aula',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './aula.component.html',
  styleUrl: './aula.component.css'
})
export class AulaComponent {
  aula: NuevaAula[] = [];
  listaVacia: string | undefined;

  constructor(
    private aulaService: AulaService,
  ) { }

  ngOnInit(): void {
    this.cargarAulas();
  }

  cargarAulas(): void {
    this.aulaService.lista().subscribe(
      (data: NuevaAula[]) => {
        this.aula = data;
        this.listaVacia = undefined;
      },
      (error: any) => {
        this.listaVacia = 'No tienes Aulas';
      }
    );
  }

  borrar(id_aula: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar el aula?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.aulaService.delete(id_aula).subscribe({
          next: (response: any) => {
            console.log('Aula eliminada correctamente', response);
            Swal.fire(
              'Eliminado!',
              'El aula ha sido eliminada correctamente.',
              'success'
            );
            this.cargarAulas();
          },
          error: (error: any) => {
            console.error('Error al eliminar el aula', error);
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el aula.',
              'error'
            );
          }
        })
      }
    });
  }
}
