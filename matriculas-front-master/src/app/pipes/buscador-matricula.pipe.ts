import { Pipe, PipeTransform } from '@angular/core';
import { MatriculaId } from '../models/view_matricula';


@Pipe({
  name: 'buscadorMatricula',
  standalone: true
})
export class BuscadorMatriculaPipe implements PipeTransform {

  transform(matriculas: MatriculaId[], searchTerm: string): MatriculaId[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return matriculas;
    }

    const searchTermLower = searchTerm.toLowerCase();

    return matriculas.filter((matricula: MatriculaId) =>
      this.matchSearchTerm(matricula, searchTermLower)
    );
  }

  private matchSearchTerm(matricula: MatriculaId, searchTerm: string): boolean {

    // Comprobar si el término de búsqueda coincide con el nombre del estudiante
    if (matricula.alumno.nombre_estudiante.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Comprobar si el término de búsqueda coincide con el nombre del docente
    if (matricula.profesor.nombres_usuario.toLowerCase().includes(searchTerm)) {
      return true;
    }

    return false;
  }

}
