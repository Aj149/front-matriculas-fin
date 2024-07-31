import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token } from '@angular/compiler';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario, UpdateUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base = environment.URL;
  authURL = `${this.base}auth/`

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<NuevoUsuario[]> {
    return this.httpClient.get<NuevoUsuario[]>(`${this.authURL}`);
  }

  public detail(id_usuario:  number): Observable<NuevoUsuario> {
    return this.httpClient.get<NuevoUsuario>(`${this.authURL}${id_usuario}`);
  }

  public delete(id_usuario: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.authURL}${id_usuario}`);
  }

  public update(id_usuario: number, usuario: UpdateUsuario): Observable<any> {
    return this.httpClient.patch<any>(`${this.authURL}${id_usuario}`, usuario)
  }

  registro(dto: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'register', dto);
  }

  login(dto: LoginUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', dto);
  }

  refresh(dto: Token): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'refresh', dto);
  }


}
