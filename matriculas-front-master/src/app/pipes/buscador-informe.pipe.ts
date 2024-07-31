import { Pipe, PipeTransform } from '@angular/core';
import { InformeModel } from '../models/informe';

@Pipe({
  name: 'buscadorInforme',
  standalone: true
})
export class BuscadorInformePipe implements PipeTransform {

  transform(informe: InformeModel[], searchTerm: string, searchDate: string): InformeModel[] {
    if (!searchTerm && !searchDate) {
      return informe;
    }

    return informe.filter((info: InformeModel) => {
      const matchesName = searchTerm ? info.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      const matchesDate = searchDate ? new Date(info.fecha).toISOString().split('T')[0] === searchDate : true;
      return matchesName && matchesDate;
    });
  }
}