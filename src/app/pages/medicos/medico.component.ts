import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  constructor(
    private medicoSrv: MedicoService,
    private hospitalSrv: HospitalService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private modalUploadSrv: ModalUploadService) {

    this.activateRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  private cargarMedico(id: any) {
    this.medicoSrv.obtenerMedico(id).subscribe((resp: any) => {
      console.log(resp.medico);
      this.medico = resp.medico;
      this.cambioHospital(this.medico.hospital);
    });
  }

  ngOnInit() {
    this.modalUploadSrv.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    });
    this.hospitalSrv.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });

  }
  guardarMedico(f: NgForm) {
    if (f.valid) {
      if (!this.medico._id) {
        this.medicoSrv.crearMedico(this.medico).subscribe((resp: any) => {
          const medico = resp.medico as Medico;
          Swal.fire(
            'Médico creado',
            'Creado correctamente'
            , 'success'
          ).then(() => {
            this.medico._id = medico._id;
            this.router.navigate(['/medico', medico._id]);
          });
        });
      } else {
        this.medicoSrv.actualizarMedico(this.medico).subscribe((resp: any) => {
          const medico = resp.medico as Medico;
          Swal.fire(
            'Médico actualizado',
            'Actualizado correctamente'
            , 'success'
          ).then(() => {
            this.medico._id = medico._id;
            this.router.navigate(['/medico', medico._id]);
          });
        });
      }



    }
  }
  cambioHospital(id: string) {
    if (!id) {
      this.hospital = new Hospital('');
      return;
    }
    this.hospitalSrv.obtenerHospital(id).subscribe((resp: any) => {
      this.hospital = resp.hospital;
    });
  }
  cambiarFoto() {
    this.modalUploadSrv.mostrarModal('medicos', this.medico._id);
  }
}
