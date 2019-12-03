import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  progreso1: number;
  progreso2: number;
  // progreso: number;
  constructor() {
    this.progreso1 = 30;
    this.progreso2 = 20;
  }

  ngOnInit() {
  }


}
