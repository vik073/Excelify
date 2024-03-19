import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { UserManagementComponent } from 'app/modules/admin/user-management/user-management.component';
import { MaterialsModule } from 'app/shared/materials/materials.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
// import { MaterialFileInputModule } from 'ngx-material-file-input/lib/material-file-input.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ProfileBarComponent } from './profile-bar/profile-bar.component';

const routes: Route[] = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UserManagementComponent,
    },
    {
        path: 'add-user',
        component: AddUserComponent,
    },
];

@NgModule({
    declarations: [UserManagementComponent, AddUserComponent, ProfileBarComponent],
    imports: [MaterialsModule, SharedModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    NgxMatFileInputModule,

        // NgCircleProgressModule.forRoot({
        //     // set defaults here
        //     radius: 100,
        //     outerStrokeWidth: 16,
        //     innerStrokeWidth: 8,
        //     outerStrokeColor: "#78C000",
        //     innerStrokeColor: "#C7E596",
        //     animationDuration: 300,
        //   }),
            RouterModule.forChild(routes)],
})
export class UserManagementModule {}
