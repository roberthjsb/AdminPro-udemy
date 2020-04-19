import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  loading = false;
  constructor(private UsuarioServ: UsuarioService, private uploadModalService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.uploadModalService.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    });
  }
  cargarUsuarios(desde: number = 0) {
    this.loading = true;
    this.UsuarioServ.cargarUsuarios(desde).subscribe((res: any) => {
      this.totalRegistros = res.total;
      this.usuarios = res.usuarios;
      this.loading = false;

    });
  }
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    const estfueraDeLimites = desde < 0 || desde >= this.totalRegistros;
    if (estfueraDeLimites) {
      return;
    }
    this.cargarUsuarios(desde);
  }
  buscarUsuario(busqueda: string) {
    this.loading = true;
    this.UsuarioServ.buscarUsuario(busqueda)
      .subscribe((resp: any) => {
        this.usuarios = resp.usuarios;
        this.loading = false;
      });
  }
  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.UsuarioServ.usuario._id) {
      Swal.fire('Error', 'No puede borrar su propio usuario', 'error');
    }

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Se borrara el usuario ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((borrar) => {
      if (borrar.value === true) {
        this.UsuarioServ.borrarUsuario(usuario).subscribe((borrado) => {
          this.cargarUsuarios(this.desde);
          Swal.fire(
            'Usuario borrado',
            'Borrado correctamente'
            , 'success'
          );
        });
      } else {
        Swal.fire(
          'Usuario borrado',
          'Usuario cancelo operacion'
          , 'info'
        );
      }
    });
  }
  guardarUsuario(usuario: Usuario) {
    this.UsuarioServ.actualizarUsuario(usuario).subscribe(resp => {
      Swal.fire(
        'Usuario Actualizado',
        'Actualizado correctamente'
        , 'success'
      );

    });
  }
  mostrarModal(id: string) {
    console.log({ id });
    this.uploadModalService.mostrarModal('usuarios', id);
  }

}
