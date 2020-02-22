import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  crearUsuario(usuario: Usuario): Observable<any> {
    const url = `${URL_SERVICIOS}/usuarios`;
    return this.http.post(url, usuario);

  }
}
