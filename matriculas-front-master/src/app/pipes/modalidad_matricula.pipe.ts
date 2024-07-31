import { Pipe, PipeTransform } from '@angular/core';
import { Horario } from '../models/horario';

@Pipe({
  name: 'filterByModalidad',
  standalone: true
})
export class FilterByModalidadPipe implements PipeTransform {

  transform(horarios: Horario[], modalidad: string): Horario[] {
    if (!modalidad || modalidad === '') {
      return horarios;
    }
    return horarios.filter(horario => horario.modalidad === modalidad);
  }
}
