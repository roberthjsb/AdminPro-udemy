import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() progreso: number;
  @Input() leyenda: string;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.progreso = 50;
    this.leyenda = 'Leyenda';
  }

  ngOnInit() {
    console.log(this.progreso);
  }
  cambiarValor(valor: number) {
    let progreso = this.progreso + valor;
    progreso = this.limitaProgreso(progreso);
    this.cambioValor.emit(this.progreso);
  }

  private limitaProgreso(progreso: number) {
    if (progreso > 100) {
      progreso = 100;
    }
    if (progreso < 0) {
      progreso = 0;
    }
    this.progreso = progreso;
    return progreso;
  }

  onChange($newValue: InputEvent) {
    debugger
    $newValue.currentTarget.value = this.limitaProgreso(Number($newValue.currentTarget.value));
    this.cambioValor.emit(this.progreso);
  }


}
