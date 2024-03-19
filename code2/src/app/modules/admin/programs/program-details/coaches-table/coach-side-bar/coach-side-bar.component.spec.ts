import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSideBarComponent } from './coach-side-bar.component';

describe('CoachSideBarComponent', () => {
  let component: CoachSideBarComponent;
  let fixture: ComponentFixture<CoachSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
