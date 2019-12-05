import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private refDocument: HTMLDocument,
    private setting: SettingsService) { }

  ngOnInit() {
    this.cambiarCss(this.setting.ajustes.tema);
    const elemento: HTMLElement = document.getElementsByClassName(this.setting.ajustes.tema + '-theme').item(0) as HTMLElement;
    this.aplicarCheck(elemento);
  }

  cambiarCss(tema: string) {
    const urlcssTheme = `${environment.themeUrlBase}${tema}.css`;
    this.refDocument.getElementById('theme').setAttribute('href', urlcssTheme);
    this.setting.ajustes.tema = tema;
    this.setting.ajustes.temaURL = urlcssTheme;
    this.setting.guardarTema();
  }
  cambiarTema(elemento: HTMLElement) {
    const tema = elemento.getAttribute('data-theme');
    this.cambiarCss(tema);
    this.aplicarCheck(elemento);
  }
  aplicarCheck(link: HTMLElement) {
    const elementos: HTMLCollection = document.getElementsByClassName('working');
    for (let index = 0, max = elementos.length; index < max; index++) {
      const el = elementos[index];
      el.classList.remove('working');
    }
    link.classList.add('working');
  }
}
