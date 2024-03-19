import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSideHeaderBarComponent } from './program-side-header-bar.component';

describe('ProgramSideHeaderBarComponent', () => {
  let component: ProgramSideHeaderBarComponent;
  let fixture: ComponentFixture<ProgramSideHeaderBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramSideHeaderBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramSideHeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
