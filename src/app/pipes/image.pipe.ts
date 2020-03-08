import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/app.config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    debugger;
    let url = URL_SERVICIOS + '/imagenes';
    if (!img) {
      return url + 'usuario/xxx';
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    ['medico', 'hospital', 'usuario'].includes(tipo) ? url += `/${tipo}s/${img}` : url += 'usuario/xxx';
    return url;
  }

}
