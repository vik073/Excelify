import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedDialogComponent } from './deleted-dialog.component';

describe('DeletedDialogComponent', () => {
  let component: DeletedDialogComponent;
  let fixture: ComponentFixture<DeletedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
