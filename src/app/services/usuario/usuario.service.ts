import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(
    private http: HttpClient,
    private router: Router) {
    this.cargarStorage();
  }
  guardarLocalStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }
  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  estaLogueado() {
    return this.token.length > 5;
  }
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  login(usuario: Usuario, recordar: boolean) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = `${URL_SERVICIOS}/login`;
    return this.http.post(url, usuario).pipe(map((resp: any) => {
      this.guardarLocalStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
  }
  loginGoogle(token: string) {
    const url = `${URL_SERVICIOS}/login/google`;
    return this.http.post(url, { token }).pipe(map((resp: any) => {
      this.guardarLocalStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));

  }
  crearUsuario(usuario: Usuario): Observable<any> {
    const url = `${URL_SERVICIOS}/usuarios`;
    return this.http.post(url, usuario);

  }
}
