import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'coach-search',
    templateUrl: './coach-search.component.html',
    styleUrls: ['./coach-search.component.scss'],
})
export class CoachSearchComponent {
    /**
     * Constructor
     */
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.matIconRegistry.addSvgIcon(
            'create_program',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/images/create_program.svg'
            )
        );
        this.matIconRegistry.addSvgIcon(
            'range',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/images/range.svg'
            )
        );
    }
}
