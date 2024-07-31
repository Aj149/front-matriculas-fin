import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NuevaAula } from '../models/aula';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  base = environment.URL;
  aulaURL = `${this.base}matricula/aula/`;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<NuevaAula[]> {
    return this.httpClient.get<NuevaAula[]>(`${this.aulaURL}`);
  }

  public detail(id_aula: number): Observable<NuevaAula> {
    return this.httpClient.get<NuevaAula>(`${this.aulaURL}${id_aula}`);
  }

  public save(aula: NuevaAula): Observable<any> {
    return this.httpClient.post<any>(`${this.aulaURL}`, aula);
  }

  public update(id_aula: number, aula: NuevaAula): Observable<any> {
    return this.httpClient.patch<any>(`${this.aulaURL}${id_aula}`, aula);
  }

  public delete(id_aula: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.aulaURL}${id_aula}`);
  }
}
