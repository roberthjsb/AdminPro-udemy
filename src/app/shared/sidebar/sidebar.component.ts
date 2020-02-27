import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public sidebarserv: SidebarService,
    private usuarioService: UsuarioService
  ) {

  }

  ngOnInit() {
  }
  logout() {
    this.usuarioService.logout();
  }

}
