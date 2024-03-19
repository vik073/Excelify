import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoacheesTableComponent } from './coachess-table.component';

describe('CoachessTableComponent', () => {
  let component: CoacheesTableComponent;
  let fixture: ComponentFixture<CoacheesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoacheesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoacheesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
