import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoacheeSideBarComponent } from './coachee-side-bar.component';

describe('CoacheeSideBarComponent', () => {
  let component: CoacheeSideBarComponent;
  let fixture: ComponentFixture<CoacheeSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoacheeSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoacheeSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
