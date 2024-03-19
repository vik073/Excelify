import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoachSearchResultComponent } from 'app/modules/landing/coach-search-result/coach-search-result.component';
import { MaterialsModule } from 'app/shared/materials/materials.module';

const routes: Route[] = [
    {
        path: '',
        component: CoachSearchResultComponent,
    },
];

@NgModule({
    declarations: [CoachSearchResultComponent],
    imports: [MaterialsModule, RouterModule.forChild(routes)],
})
export class CoachSearchResultModule {}
