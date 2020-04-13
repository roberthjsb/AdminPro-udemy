import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public oculto = 'oculto';
  public tipo: string;
  public id: string;
  public notificacion = new EventEmitter<any>();
  constructor() {
    console.log('ModalUploadService');
  }
  ocultarModal() {
    this.oculto = 'oculto';
  }
  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
  }
}
