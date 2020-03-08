import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {
  constructor(private http: HttpClient) { }
  subirArchivo(image: File, tipo: string, id: string) {
      const url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('image', image);
      return this.http.put(url, formData);
  }
}
