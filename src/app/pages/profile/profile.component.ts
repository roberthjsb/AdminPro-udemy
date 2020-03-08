import { Component, OnInit, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imageUpload: File = null;
  imagenTemp:string;
  constructor(private usuarioServ: UsuarioService) {
    this.usuario = this.usuarioServ.usuario;
  }

  ngOnInit() { }
  guardar(usuario: Usuario) {
    console.log({ usuario });
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this.usuarioServ.actualizarUsuario(this.usuario).subscribe(respOK => {
      if (respOK) {
        Swal.fire('Información', 'Usuario ha sido registrado', 'success');
      }
    });
  }
  imageSelected(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) {
      this.imageUpload = null;
      return;
    }
    if(archivo.type.indexOf('image') < 0){
      this.imageUpload = null;
      Swal.fire('Error', 'Solo puede selecionar imagenes', 'error');
    }
    this.imageUpload = archivo;
    let reader = new FileReader();
    let urlTempReader = reader.readAsDataURL(archivo);
    reader.onloadend = ()=> this.imagenTemp = reader.result as string;
  }

  cambiarImagen() {
    this.usuarioServ.cambiarImagen(this.imageUpload, this.usuario._id).subscribe((respOK) => {
      if (respOK) {
        this.usuario= this.usuarioServ.usuario;
        Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
        return;

      }
    });
  }
}
