import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminProfileComponent } from 'app/modules/profiles/admin-profile/admin-profile.component';
import { MaterialsModule } from 'app/shared/materials/materials.module';

const routes: Route[] = [
    {
        path: '',
        component: AdminProfileComponent,
    },
];

@NgModule({
    declarations: [AdminProfileComponent],
    imports: [MaterialsModule, RouterModule.forChild(routes)],
})
export class AdminProfileModule {}
