import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { FuseCardModule } from '@fuse/components/card';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { apiServices } from 'app/api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { ApiServicesModule } from '@fuse/services/api-services/api-services.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from './shared/table/table.module';
import { MatSortModule } from '@angular/material/sort';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToastrModule } from 'ngx-toastr';
import { MaterialFileInputModule } from 'ngx-material-file-input';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        MatSortModule,
        NgbModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        CommonModule,

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(apiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        FuseCardModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        ApiServicesModule,
        NgbModule,
        TableModule,
        MaterialFileInputModule,
        NgCircleProgressModule.forRoot({
            // set defaults here
            radius: 100,
            outerStrokeWidth: 16,
            innerStrokeWidth: 8,
            outerStrokeColor: "#78C000",
            innerStrokeColor: "#C7E596",
            animationDuration: 300,
          }),
          ToastrModule.forRoot(
            {
              maxOpened: 1,
              progressBar: true,
              progressAnimation: 'decreasing',
              preventDuplicates: true,
            }), 
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
