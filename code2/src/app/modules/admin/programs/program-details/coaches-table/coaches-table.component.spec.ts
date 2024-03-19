import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesTableComponent } from './coaches-table.component';

describe('CoachesTableComponent', () => {
  let component: CoachesTableComponent;
  let fixture: ComponentFixture<CoachesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
