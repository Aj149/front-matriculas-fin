  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class TokenService {

    isLogged(): boolean {
      if (this.getToken()) {
        return true;
      }
      return false;
    }

    setToken(token: string): void {
      localStorage.setItem('token', token);
    }

    getToken(): string | null {
      return localStorage.getItem('token');
    }

    getNombreUsuario(): string | null {
      const token = this.getToken();
      if (!token) {
        return null;
      }
      const payload = token.split('.')[1];
      const values = atob(payload);
      const valuesJson = JSON.parse(values);
      const nombreUsuario = valuesJson?.nombreUsuario;
      return nombreUsuario || null;
    }

    isAdmin(): boolean | null {
      const token = this.getToken();
      if (!token) {
        return null;
      }
      const payload = token.split('.')[1];
      const values = atob(payload);
      const valuesJson = JSON.parse(values);
      const roles = valuesJson?.roles;
      if (roles && roles.indexOf('admin') >= 0) {
        return true;
      }
      return false;
    }

    getUserInfo(): any | null {
      const token = this.getToken();
      if (token) {
        // Decodificar el token para obtener la información del usuario
        const userInfo = JSON.parse(atob(token.split('.')[1]));
        return userInfo;
      }
      return null;
    }

    getUserRole(): string | null {
      const userInfo = this.getUserInfo();
      return userInfo ? userInfo.nombre_rol : null;
    }

    getUserId(): number | null {
const userInfo = this.getUserInfo();
return userInfo ? userInfo.id_usuario : null;
    }

    getInfoUser(): string | null {
      const token = this.getToken();
      if (!token) {
        return null;
      }
      const payload = token.split('.')[1];
      const values = atob(payload);
      const valuesJson = JSON.parse(values);
      const nombre_usuario = valuesJson?.nombres_usuario;
      return nombre_usuario || null;
    }

    logOut(): void {
      localStorage.clear();
      window.location.reload();
    }
  }
