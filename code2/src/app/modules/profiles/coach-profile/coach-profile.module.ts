import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoachProfileComponent } from 'app/modules/profiles/coach-profile/coach-profile.component';
import { MaterialsModule } from 'app/shared/materials/materials.module';

const routes: Route[] = [
    {
        path: '',
        component: CoachProfileComponent,
    },
];

@NgModule({
    declarations: [CoachProfileComponent],
    imports: [MaterialsModule, RouterModule.forChild(routes)],
})
export class CoachProfileModule {}
