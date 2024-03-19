import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoacheeProfileComponent } from 'app/modules/profiles/coachee-profile/coachee-profile.component';
import { MaterialsModule } from 'app/shared/materials/materials.module';

const routes: Route[] = [
    {
        path: '',
        component: CoacheeProfileComponent,
    },
];

@NgModule({
    declarations: [CoacheeProfileComponent],
    imports: [MaterialsModule, RouterModule.forChild(routes)],
})
export class CoacheeProfileModule {}
