import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEngagementComponent } from './create-engagement.component';

describe('CreateEngagementComponent', () => {
  let component: CreateEngagementComponent;
  let fixture: ComponentFixture<CreateEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEngagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
