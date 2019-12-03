import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas-donuts',
  templateUrl: './graficas-donuts.component.html',
  styleUrls: ['./graficas-donuts.component.css']
})
export class GraficasDonutsComponent implements OnInit {
@Input()
 public Labels: Label[] = [];
 @Input()
 public Data: MultiDataSet = [ ];
 @Input()
 doughnutChartType: ChartType = 'doughnut';


  constructor() { }

  ngOnInit() {
  }

}
