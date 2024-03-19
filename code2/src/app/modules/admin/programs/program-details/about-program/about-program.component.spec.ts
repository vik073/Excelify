import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProgramComponent } from './about-program.component';

describe('AboutProgramComponent', () => {
  let component: AboutProgramComponent;
  let fixture: ComponentFixture<AboutProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
