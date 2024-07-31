import { Pipe, PipeTransform } from '@angular/core';
import { Horario } from '../models/horario';

@Pipe({
  name: 'buscadorHorario',
  standalone: true
})
export class BuscadorHorarioPipe implements PipeTransform {

  transform(horarios: Horario[], modalidad: string, dia: string): Horario[] {
    if (!modalidad || modalidad.trim() === '' || !dia || dia.trim() === '') {
      return horarios;
    }

    const modalidadLowerCase = modalidad.toLowerCase();
    const diaLowerCase = dia.toLowerCase();

    return horarios.filter((horario: Horario) =>
      horario.modalidad.toLowerCase().includes(modalidadLowerCase) &&
      horario.dia.toLowerCase().includes(diaLowerCase)
    );
  }

}
