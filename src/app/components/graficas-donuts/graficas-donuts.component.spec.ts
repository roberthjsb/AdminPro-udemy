import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasDonutsComponent } from './graficas-donuts.component';

describe('GraficasDonutsComponent', () => {
  let component: GraficasDonutsComponent;
  let fixture: ComponentFixture<GraficasDonutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficasDonutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasDonutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
