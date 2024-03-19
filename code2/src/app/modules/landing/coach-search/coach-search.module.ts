import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoachSearchComponent } from 'app/modules/landing/coach-search/coach-search.component';
import { MaterialsModule } from 'app/shared/materials/materials.module';

const routes: Route[] = [
    {
        path: '',
        component: CoachSearchComponent,
    },
];

@NgModule({
    declarations: [CoachSearchComponent],
    imports: [MaterialsModule, RouterModule.forChild(routes)],
})
export class CoachSearchModule {}
