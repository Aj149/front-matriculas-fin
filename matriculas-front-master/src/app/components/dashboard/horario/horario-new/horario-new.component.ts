import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorarioService } from '../../../../services/horario.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateHorario } from '../../../../models/horario';
import { NuevaAula } from '../../../../models/aula';
import { AulaService } from '../../../../services/aula.service';
import { FormatoHoraPipe } from '../../../../pipes/formato_hora.pipe';


@Component({
  selector: 'app-horario-new',
  standalone: true,
  imports: [FormsModule, FormatoHoraPipe],
  templateUrl: './horario-new.component.html',
  styleUrl: './horario-new.component.css',
})
export class HorarioNewComponent implements OnInit {

  horario: CreateHorario = {
    dia: '',
    horaInicio: '',
    horaSalida: '',
    modalidad: '',
    aulaId: 0,
    horario: '',
  };

  aula: NuevaAula[] = [];
  mensage = '';



  constructor(
    private router: Router,
    private horarioService: HorarioService,
    private toastr: ToastrService,
    private aulaService: AulaService
  ) { }

  ngOnInit(): void {
    this.cargarAula();
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

  create(): void {
    console.log('ID del aula seleccionada:', this.horario.aulaId);
    this.horarioService.create(this.horario).subscribe(
      (data: any) => {
        this.toastr.success(data.message, 'horario creado exitosamente', {
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
        console.log(err);
      }
    )
  }

  volver(): void {
    this.router.navigate(['/dashboard/horario']);
  }
}
