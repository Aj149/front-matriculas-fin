import { Pipe, PipeTransform } from '@angular/core';
import { Estudiante } from '../models/estudiante';

@Pipe({
  name: 'buscadorEstudiante',
  standalone: true
})
export class BuscadorEstudiantePipe implements PipeTransform {

  transform(estudiantes: Estudiante[], nombre: string, cedula: string): Estudiante[] {
    if (!estudiantes) return [];
    if (!nombre && !cedula) return estudiantes;

    const nombreLower = nombre ? nombre.toLowerCase() : '';
    const cedulaLower = cedula ? cedula.toLowerCase() : '';

    return estudiantes.filter(estudiante => {
      const matchesNombre = nombre ? estudiante.nombre_estudiante.toLowerCase().includes(nombreLower) : true;
      const matchesCedula = cedula ? estudiante.cedula_estudiante.toLowerCase().includes(cedulaLower) : true;
      return matchesNombre && matchesCedula;
    });
  }

}
