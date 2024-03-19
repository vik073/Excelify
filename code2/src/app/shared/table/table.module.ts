import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialsModule } from '../materials/materials.module';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MaterialsModule,
        MatPaginatorModule,
        MatTableModule,
        MaterialsModule,
        MatTableModule,
        MatSortModule,
    ],
    declarations: [TableComponent],
    exports: [
        TableComponent
    ]
})
export class TableModule {}