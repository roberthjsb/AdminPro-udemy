import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/app.config';

import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  token: string;
  constructor(private http: HttpClient, private usuariioServices: UsuarioService) {
    this.token = this.usuariioServices.token;
  }
  cargarHospitales() {
    const url = `${URL_SERVICIOS}/hospitales`;
    return this.http.get(url);
  }
  obtenerHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospitales/${id}`;
    return this.http.get(url);
  }
  borrarHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospitales/${id}?token=${this.token}`;
    return this.http.delete(url)
      .pipe(map(borrado => {
        console.log(borrado);
        this.cargarHospitales();
        return true;
      }));

  }
  crearHospital(hospital: Hospital) {
    const url = `${URL_SERVICIOS}/hospitales?token=${this.token}`;
    return this.http.post(url, hospital);
  }
  buscarHospital(busqueda: string) {
    const url = `${URL_SERVICIOS}/busqueda/colecciones/hospitales/${busqueda}`;
    return this.http.get(url);
  }
  actualizarHospital(hospital: Hospital) {
    const url = `${URL_SERVICIOS}/hospitales/${hospital._id}?token=${this.token}`;
    return this.http.put(url, hospital);
   }
}
