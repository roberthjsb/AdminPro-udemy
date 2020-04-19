import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/app.config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/imagenes';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('http') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'medico':
        url += '/medicos/' + img;
        break;

      case 'hospitales':
         url += '/hospitales/' + img;
         break;

      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usurios/xxx';
    }

    return url;
  }

}
