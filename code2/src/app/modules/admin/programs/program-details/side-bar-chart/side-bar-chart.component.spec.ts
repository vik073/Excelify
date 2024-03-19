import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarChartComponent } from './side-bar-chart.component';

describe('SideBarChartComponent', () => {
  let component: SideBarChartComponent;
  let fixture: ComponentFixture<SideBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
