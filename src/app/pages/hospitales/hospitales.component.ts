import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, OnChanges, AfterContentChecked } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, AfterContentChecked {
  totalRegistros = 0;
  loading = false;
  hospitales: Hospital[] = [];
  editarItem: string;
  @ViewChild('inputEditor', { static: false }) inputEditor: ElementRef;
  constructor(
    private hospitalService: HospitalService,
    private uploadModalService: ModalUploadService
  ) { }
  ngAfterContentChecked(): void {

    if (this.inputEditor && this.inputEditor.hasOwnProperty('nativeElement')) {
      const input: HTMLInputElement = this.inputEditor.nativeElement as HTMLInputElement;
      input.focus();
    }

  }
  ngOnInit() {
    this.cargarHospitales();
  }

  mostrarModal(id: string) {
    this.uploadModalService.mostrarModal('hospitales', id);
  }
  cargarHospitales() {
    this.loading = true;
    this.hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.hospitales.length;
      this.loading = false;
    });
  }
  buscarHospital(busqueda: string) {
    this.hospitalService.buscarHospital(busqueda)
      .pipe(debounceTime(500))
      .subscribe((resp: any) => {
        this.hospitales = resp.hospitales;
      });
  }
  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe(resp => {
      Swal.fire(
        'Hospital Actualizado',
        'Actualizado correctamente'
        , 'success'
      );
    });
  }
  borrarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id).subscribe(resp => {
      Swal.fire(
        'Hospital Eliminado',
        'Actualizado correctamente'
        , 'success'
      );
      this.cargarHospitales();
    });
  }
  crearHospital() {
    let nombreHospital = '';
    let hospital: Hospital;
    const promiseDiaog = Swal.fire({
      title: 'Nombre del Hospital',
      input: 'text',
      inputValue: '',
      showCancelButton: true
    })
      .then((resp) => {
        nombreHospital = resp.value;
        hospital = new Hospital(nombreHospital, '', '');
        this.hospitalService.crearHospital(hospital).subscribe(result => {
          console.log('resp...', result);
          this.cargarHospitales();
        });
      })
      .catch((respErr) => {
        console.log({ respErr });
      }).finally(() => {
      });

  }
  editar(id: string) {
    if (this.editarItem !== id) {
      this.editarItem = id;
    } else {
      this.editarItem = '';
    }
  }
  closeEditor(id: string) {
    this.editarItem = '';
  }


}
