import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InformeModel, NuevoInforme } from '../models/informe';

@Injectable({
  providedIn: 'root'
})
export class InformeService {
  
  informeUrl = `${environment.URL}informe/`

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<InformeModel[]> {
    return this.httpClient.get<InformeModel[]>(`${this.informeUrl}`);
  }

  public detail(id: number): Observable<InformeModel> {
    return this.httpClient.get<InformeModel>(`${this.informeUrl}${id}`);
  }

  getInformesByUsuario(id_usuario: number): Observable<InformeModel[]> {
    const url = `${this.informeUrl}instructor/${id_usuario}/informes`;
    return this.httpClient.get<InformeModel[]>(url);
  }

  public save(informe: NuevoInforme): Observable<any> {
    return this.httpClient.post<any>(`${this.informeUrl}`, informe)
  }

  public update(id: number, informe:  NuevoInforme): Observable<any> {
    return this.httpClient.patch<any>(`${this.informeUrl}${id}`, informe)
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.informeUrl}${id}`)
  }
}
