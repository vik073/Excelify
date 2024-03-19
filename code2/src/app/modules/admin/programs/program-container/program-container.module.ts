import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CreateProgramComponent } from '../create-program/create-program.component';
import { CoachesListComponent } from '../coaches-list/coaches-list.component';
import { MaterialsModule } from 'app/shared/materials/materials.module';
import { ProgramContainerComponent } from './program-container.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    declarations: [CreateProgramComponent, CoachesListComponent, ProgramContainerComponent],
    imports: [
        CommonModule,
        MaterialsModule,
        MatTabsModule,
        MatCheckboxModule,
        MatChipsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        MatSelectModule,
    ],
    exports: [
        CreateProgramComponent, CoachesListComponent, ProgramContainerComponent
    ]
})
export class ProgramModule { }
