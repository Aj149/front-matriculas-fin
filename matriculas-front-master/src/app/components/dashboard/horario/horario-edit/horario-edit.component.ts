import { Component } from '@angular/core';
import { Horario } from '../../../../models/horario';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AulaService } from '../../../../services/aula.service';
import { HorarioService } from '../../../../services/horario.service';
import { NuevaAula } from '../../../../models/aula';
import { FormsModule } from '@angular/forms';
// Sweetalert -> para las alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './horario-edit.component.html',
  styleUrl: './horario-edit.component.css'
})
export class HorarioEditComponent {

  horario: Horario = new Horario()

  aula: NuevaAula[] = [];
  mensage = '';

  constructor(
    private aulaService: AulaService,
    private horarioService: HorarioService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarAula();
    const id_horario = this.activatedRoute.snapshot.params['id_horario'];
    this.horarioService.detail(id_horario).subscribe(
      (data: any) => {
        this.horario = data;
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
  }

  ajustarHora(campo: 'horaInicio' | 'horaSalida') {
    if (this.horario[campo]) {
      const [horas] = this.horario[campo].split(':');
      this.horario[campo] = `${horas}:00`;
    }
  }

  cargarAula(): void {
    this.aulaService.lista().subscribe(
      (data: NuevaAula[]) => {
        this.aula = data;
        this.mensage = ''
      },
      (err: any) => {
        this.mensage = 'No tienes aulas disponibles';
        console.log(err);
      },
    );
  }

  Update(): void {
    const id_horario = this.activatedRoute.snapshot.params['id_horario'];
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres actualizar el horario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioService.update(id_horario, this.horario).subscribe(
          (data: any) => {
            this.toastr.success(data.message, 'Horario actualizado', {
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
    this.router.navigate(['/dashboard/horario']);
  }
}
