import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { HeaderComponent } from './header/header.component';
import { MaterialsModule } from './materials/materials.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RatingComponent } from './rating/rating.component';
import { CreateEngagementComponent } from './create-engagement/create-engagement.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FuseCardModule } from '@fuse/components/card';
import { TableModule } from './table/table.module';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { RatingDetailsComponent } from 'app/modules/admin/programs/program-details/rating-details/rating-details.component';

@NgModule({
    imports: [MatIconModule,MaterialsModule,
        FormsModule,CommonModule,
        ReactiveFormsModule,
        ],
    declarations: [HeaderComponent, RatingComponent, CreateEngagementComponent, BreadcrumComponent,RatingDetailsComponent],
    exports: [MaterialsModule,
        FuseCardModule,
        CommonModule,
        TableModule,
        MatTableModule,
        MatSortModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RatingComponent,
        HeaderComponent,
        MatIconModule,
        MaterialsModule,
        MatPaginatorModule,
        CreateEngagementComponent,
        BreadcrumComponent,
        RatingDetailsComponent
    ]
})
export class SharedModule {}