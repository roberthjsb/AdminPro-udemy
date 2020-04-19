import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  totalRegistros = 0;
  constructor(private medicoSrv: MedicoService, private uploadModalService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();
    this.uploadModalService.notificacion.subscribe(resp => this.cargarMedicos());
  }
  cargarMedicos() {
    this.medicoSrv.cargarMedicos().subscribe((resp: any) => {
      this.medicos = resp.medicos;
      this.totalRegistros = this.medicos.length;
    });
  }

  mostrarModal(id: string) {
    this.uploadModalService.mostrarModal('medicos', id);
  }
  crearMedico() {

  }
  borrarMedico(id: string) {
    this.medicoSrv.borrarMedico(id).subscribe(resp => {
      Swal.fire(
        'Hospital Eliminado',
        'Actualizado correctamente'
        , 'success'
      );
      this.cargarMedicos();
    });
  }
}
