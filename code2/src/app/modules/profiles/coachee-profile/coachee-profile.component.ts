import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'coachee-profile',
    templateUrl: './coachee-profile.component.html',
    styleUrls: ['./coachee-profile.component.scss'],
})
export class CoacheeProfileComponent {
    /**
     * Constructor
     */
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.matIconRegistry.addSvgIcon(
            'range',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/images/range.svg'
            )
        );
    }
}
