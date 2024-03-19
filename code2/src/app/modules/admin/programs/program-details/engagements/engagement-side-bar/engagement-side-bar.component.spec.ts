import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementSideBarComponent } from './engagement-side-bar.component';

describe('EngagementSideBarComponent', () => {
  let component: EngagementSideBarComponent;
  let fixture: ComponentFixture<EngagementSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
