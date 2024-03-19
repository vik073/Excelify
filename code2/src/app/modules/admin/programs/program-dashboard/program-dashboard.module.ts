import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProgramDashboardComponent } from 'app/modules/admin/programs/program-dashboard/program-dashboard.component';
import { MaterialsModule } from 'app/shared/materials/materials.module';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { SearchComponent } from './search/search.component';
import { DeletedDialogComponent } from './deleted-dialog/deleted-dialog.component';
import { ProgramModule } from '../program-container/program-container.module';
import { ProgramContainerComponent } from '../program-container/program-container.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

const programRoutes: Route[] = [
    {
        path: 'all',
        component: ProgramDashboardComponent,
        children: [
            {
                path: 'addCoach',
                pathMatch: 'prefix',
                children: [
                    {
                        path: ':id',
                        component: SideBarComponent,
                    },
                ]
            },
            {
                path: 'addCoachee',
                pathMatch: 'prefix',
                children: [
                    {
                        path: ':id',
                        component: SideBarComponent,
                    },
                ]
            },
            {
                path: 'addEngagement',
                pathMatch: 'prefix',
                children: [
                    {
                        path: ':id',
                        component: SideBarComponent,
                    },
                ]
            }
        ]
    },
    {
        path: 'details',
        loadChildren: () =>
            import(
                'app/modules/admin/programs/program-details/program-details.module'
            ).then((m) => m.ProgramDetailsModule),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all'
    },
    {
        path: 'create-program',
        component: ProgramContainerComponent,
        children: [

        ]
    }


];

@NgModule({
    declarations: [ProgramDashboardComponent,
        SearchComponent,
        DeletedDialogComponent,
        SideBarComponent],
    imports: [
        CommonModule,
        MaterialsModule,
        RouterModule.forChild(programRoutes),
        FuseCardModule,
        SharedModule,
        ProgramModule,
        MatDatepickerModule
    ],
})
export class ProgramDashboardModule { }
