import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingSideBarComponent } from './rating-side-bar.component';

describe('RatingSideBarComponent', () => {
  let component: RatingSideBarComponent;
  let fixture: ComponentFixture<RatingSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
