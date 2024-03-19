import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'coach-profile',
    templateUrl: './coach-profile.component.html',
    styleUrls: ['./coach-profile.component.scss'],
})
export class CoachProfileComponent {
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
