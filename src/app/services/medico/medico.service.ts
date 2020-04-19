import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/app.config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  token: string;
  constructor(private http: HttpClient, private usuariioServices: UsuarioService) {
    this.token = this.usuariioServices.token;
  }
  cargarMedicos() {
    const url = `${URL_SERVICIOS}/medicos`;
    return this.http.get(url);
  }
  obtenerMedico(id: string) {
    const url = `${URL_SERVICIOS}/medicos/${id}`;
    return this.http.get(url);
  }
  borrarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medicos/${id}?token=${this.token}`;
    return this.http.delete(url);
  }
  crearMedico(medico: Medico) {
    const url = `${URL_SERVICIOS}/medicos?token=${this.token}`;
    return this.http.post(url, medico);
  }
  buscarMedico(busqueda: string) {
    const url = `${URL_SERVICIOS}/busqueda/colecciones/medicos/${busqueda}`;
    return this.http.get(url);
  }
  actualizarMedico(medico: Medico) {
    const url = `${URL_SERVICIOS}/medicos/${medico._id}?token=${this.token}`;
    return this.http.put(url, medico);
   }
}
