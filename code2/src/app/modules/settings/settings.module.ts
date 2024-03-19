import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MaterialsModule } from 'app/shared/materials/materials.module';
import { AccountsComponent } from './accounts/accounts.component';
import { GeneralSettingsComponent } from './general/general-settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SecurityComponent } from './security/security.component';
import { IntegrationComponent } from './integration/integration.component';


const settingsRoutes: Route[] = [
    {
        path: '',
        component: GeneralSettingsComponent,
    },
];

@NgModule({
    declarations: [
        GeneralSettingsComponent,
        AccountsComponent,
        SecurityComponent,
        NotificationsComponent,
        IntegrationComponent,
    ],
    imports: [
        MaterialsModule,
        RouterModule.forChild(settingsRoutes),
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralSettingsModule {}
