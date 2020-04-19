import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { SubirArchivosService } from 'src/app/services/subir-archivos.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {
  //  oculto = '';
  imageUpload: File = null;
  imagenTemp: string;
  @ViewChild('inputFile', { static: false }) inputFile: ElementRef;
  constructor(
    private subirArchivosService: SubirArchivosService,
    public modalUplaod: ModalUploadService
  ) { }

  ngOnInit() {
    console.log('ngOninit.....', this.inputFile);

  }

  subirImagen() {
    this.subirArchivosService
      .subirArchivo(this.imageUpload, this.modalUplaod.tipo, this.modalUplaod.id)
      .subscribe(resp => {
        this.modalUplaod.notificacion.emit(resp);
        this.cerrarModal();
      });
  }
  cerrarModal() {
    console.log('click close');
    this.imageUpload = null;
    this.imagenTemp = null;
    this.modalUplaod.ocultarModal();
    this.inputFile.nativeElement.value = '';
    // this.oculto= this.modalUplaod.oculto;
  }
  imageSelected(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) {
      this.imageUpload = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      this.imageUpload = null;
      Swal.fire('Error', 'Solo puede selecionar imagenes', 'error');
    }
    this.imageUpload = archivo;
    const reader = new FileReader();
    const urlTempReader = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result as string;
  }


}
