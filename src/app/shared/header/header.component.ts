import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor(public usuarioServices: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioServices.usuario;
    console.log(this.usuario)

  }
  logout() {
    this.usuarioServices.logout();
  }

}
