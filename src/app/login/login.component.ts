import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare var gapi: any; // The Sign-In object.

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email = '';
  auth2: any = null;
  constructor(
    public router: Router,
    private usuarioService: UsuarioService
  ) {

  }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email) {
      this.recuerdame = true;
    }
  }
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '824282379619-trg7kplrgnbfqj6l1aq72gsbphrpf6sr.apps.googleusercontent.com',
        scope: 'profile email',
        cookiepolicy: 'single_host_origin'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(theElement: any) {
    this.auth2.attachClickHandler(theElement, {}, (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this.usuarioService.loginGoogle(token).subscribe(loginOK => {
        if (loginOK) {
          this.router.navigate(['/dashboard']);
        }
      });
    });
  }
  ingresar(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const usuario = new Usuario(null, form.value.email, form.value.password);
    this.usuarioService.login(usuario, form.value.recuerdame)
      .subscribe(loginOK => {
        if (loginOK) {
          this.router.navigate(['/dashboard']);
        }

      });

    // this.router.navigate(['/dashboard']);
  }


}
