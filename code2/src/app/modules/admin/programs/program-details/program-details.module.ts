import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { ProgramDetailsComponent } from 'app/modules/admin/programs/program-details/program-details.component';
import { MaterialsModule } from 'app/shared/materials/materials.module';
import { SharedModule } from 'app/shared/shared.module';
import { TableModule } from 'app/shared/table/table.module';
import { ProgramModule } from '../program-container/program-container.module';
import { EngagementsComponent } from './engagements/engagements.component';
import { SessionsComponent } from './sessions/sessions.component';
import { CoachesTableComponent } from './coaches-table/coaches-table.component';
import { CoacheesTableComponent } from './coachess-table/coachess-table.component';
import { AboutProgramComponent } from './about-program/about-program.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CreateSessionComponent } from './sessions/create-session/create-session.component';
import { CoachSideBarComponent } from './coaches-table/coach-side-bar/coach-side-bar.component';
import { CoacheeSideBarComponent } from './coachess-table/coachee-side-bar/coachee-side-bar.component';
import { InsightComponent } from './insight/insight.component';
import { ToolsComponent } from './tools/tools.component';
import { ReviewComponent } from './review/review.component';
import { RatingSideBarComponent } from './rating-details/rating-side-bar/rating-side-bar.component';
import { SideBarChartComponent } from './side-bar-chart/side-bar-chart.component';
import { ProgramSideHeaderBarComponent } from './program-side-header-bar/program-side-header-bar.component';
import { EngagementSideBarComponent } from './engagements/engagement-side-bar/engagement-side-bar.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';

const programRoutes: Route[] = [
    {
        path: ':id',
        component: ProgramDetailsComponent,
        children: [
            {
                path: '',
                redirectTo: 'about',
                pathMatch: 'full'
            },
            {
                path: 'about',
                component: AboutProgramComponent,
            },
            {
                path: 'engagements',
                component: EngagementsComponent,
            },
            {
                path: 'sessions',
                component: SessionsComponent,
            },
            {
                path: 'coaches',
                component: CoachesTableComponent,
            },
            {
                path: 'coachees',
                component: CoacheesTableComponent,
            }
        ]
    },
];

@NgModule({
    declarations: [
        ProgramDetailsComponent, 
        EngagementsComponent, 
        SessionsComponent, 
        CoachesTableComponent, 
        CoacheesTableComponent, 
        AboutProgramComponent,
        CreateSessionComponent,
        CoachSideBarComponent, 
        CoacheeSideBarComponent, 
        InsightComponent, 
        ToolsComponent, 
        ReviewComponent, 
        RatingSideBarComponent, 
        SideBarChartComponent, 
        ProgramSideHeaderBarComponent, 
        EngagementSideBarComponent],

    imports: [ MaterialsModule, 
        RouterModule.forChild(programRoutes),
        FuseCardModule,
        CommonModule,
        TableModule,
        MatTableModule,
        MatSortModule,
        SharedModule,
        ProgramModule,
        MaterialFileInputModule],

})
export class ProgramDetailsModule { }
