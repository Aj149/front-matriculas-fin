import { Injectable } from '@angular/core';
import { NuevaMateria } from '../models/materia';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  base = environment.URL;
  materiaURL = `${this.base}matricula/materia/`;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<NuevaMateria[]> {
    return this.httpClient.get<NuevaMateria[]>(`${this.materiaURL}`);
  }

  public detail(id_materia: number): Observable<NuevaMateria> {
    return this.httpClient.get<NuevaMateria>(`${this.materiaURL}${id_materia}`);
  }

  public save(materia: NuevaMateria): Observable<any> {
    return this.httpClient.post<any>(`${this.materiaURL}`, materia);
  }

  public update(id_materia: number, aula: NuevaMateria): Observable<any> {
    return this.httpClient.patch<any>(`${this.materiaURL}${id_materia}`, aula);
  }

  public delete(id_materia: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.materiaURL}${id_materia}`);
  }
}
