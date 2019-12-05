import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SettingsService {
  ajustes: Ajustes = {
    tema: 'default',
    temaURL: `${environment.themeUrlBase}default.css`
  };
  constructor( @Inject(DOCUMENT) private refDocument: HTMLDocument) {
    this.cargarAjustes();
    this.cambiarCss();
  }
  guardarTema() {
    console.log('guardando tema')
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log('cargando tema ' + this.ajustes.tema);
    } else {
      console.log('cargando tema por defecto');
    }
  }
  cambiarCss() {
    this.refDocument.getElementById('theme').setAttribute('href', this.ajustes.temaURL);
    this.guardarTema();
  }
}


interface Ajustes {
  temaURL: string;
  tema: string;
}
