import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViewHorario } from '../models/horario';
import { Materia, MatriculaId } from '../models/view_matricula';
import { Matricula } from '../models/matricula';
import { NuevaMateria } from '../models/materia';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  matriculaURL = `${environment.URL}matricula/`;


  constructor(private httpClient: HttpClient) { }

  getMatriculasByUsuario(id_usuario: number): Observable<MatriculaId[]> {
    const url = `${this.matriculaURL}usuario/${id_usuario}/matriculas`;
    return this.httpClient.get<MatriculaId[]>(url);
  }

  getHorariosByMatricula(id_matricula: number): Observable<ViewHorario[]> {
    const url = `${this.matriculaURL}${id_matricula}/horarios`;
    return this.httpClient.get<ViewHorario[]>(url);
  }

  getMateriasByMatricula(id_matricula: number): Observable<NuevaMateria[]> {
    const url = `${this.matriculaURL}${id_matricula}/materias`;
    return this.httpClient.get<NuevaMateria[]>(url);
  }

  public lista(): Observable<MatriculaId[]> {
    return this.httpClient.get<MatriculaId[]>(`${this.matriculaURL}`);
  }

  public detail(id_matricula: number): Observable<MatriculaId> {
    return this.httpClient.get<MatriculaId>(`${this.matriculaURL}${id_matricula}`);
  }

  public save(materia: Matricula): Observable<any> {
    return this.httpClient.post<any>(`${this.matriculaURL}`, materia);
  }


  public update(id_matricula: number, matricula: Matricula): Observable<any> {
    return this.httpClient.patch<any>(`${this.matriculaURL}${id_matricula}`, matricula);
  }

  public delete(id_matricula: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.matriculaURL}${id_matricula}`);
  }
}
