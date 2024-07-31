import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateHorario, Horario} from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  horarioURL = `${ environment.URL}matricula/horario/`
  modalidadUrl = `${ environment.URL}matricula/modalidad/`

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Horario[]> {
    return this.httpClient.get<Horario[]>(`${this.horarioURL}`);
  }

  getAllHorariosByModalidad(modalidad: string): Observable<Horario[]> {
    return this.httpClient.get<Horario[]>(`${this.modalidadUrl}${modalidad}`);
  }

  public detail(id_horario: number): Observable<Horario> {
    return this.httpClient.get<Horario>(`${this.horarioURL}${id_horario}`);
  }

  public create(nuevoHorario: CreateHorario): Observable<any> {
    return this.httpClient.post<any>(`${this.horarioURL}`, nuevoHorario);
  }

  public update(id_horario: number, horarioActualizado: Horario): Observable<any> {
    return this.httpClient.patch<any>(`${this.horarioURL}${id_horario}`, horarioActualizado);
  }

  public delete(id_horario: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.horarioURL}${id_horario}`);
  }

}
