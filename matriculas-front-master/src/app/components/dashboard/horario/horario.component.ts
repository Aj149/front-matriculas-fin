import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../../services/horario.service';
import { RouterLink } from '@angular/router';
import { Horario } from '../../../models/horario';
import { FormsModule } from '@angular/forms';
// Pipe de buscardor de horarios
import { BuscadorHorarioPipe } from '../../../pipes/buscador-horario.pipe';
// Paginación de lista
import { NgxPaginationModule } from 'ngx-pagination';
// Sweetalert -> para las alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, FormsModule, BuscadorHorarioPipe],
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  horarioList: Horario[] = [];
  public page!: number;
  modalidadBusqueda: string = '';
  diaBusqueda: string = '';

  constructor(
    private horarioService: HorarioService,
  ) { }

  ngOnInit(): void {
    this.obtenerHorario();
  }

  obtenerHorario(): void {
    this.horarioService.lista().subscribe({
      next: (horario: Horario[]) => {
        this.horarioList = horario
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  confirmarEliminar(id_horario: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar este horario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioService.delete(id_horario).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'El horario ha sido eliminado correctamente.',
              'success'
            );
            this.obtenerHorario();
          },
          error: (fail: any) => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el horario.',
              'error'
            );
          }
        });
      }
    });
  }
}
