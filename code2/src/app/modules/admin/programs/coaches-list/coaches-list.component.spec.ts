import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesListComponent } from './coaches-list.component';

describe('CoachesListComponent', () => {
    let component: CoachesListComponent;
    let fixture: ComponentFixture<CoachesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CoachesListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoachesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
