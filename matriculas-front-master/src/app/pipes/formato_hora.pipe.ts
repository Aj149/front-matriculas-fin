import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoHora',
  standalone: true
})
export class FormatoHoraPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const horas = value.split(':')[0]; // Extract only hours
    return horas;
  }
}
