import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'coach-search-result',
    templateUrl: './coach-search-result.component.html',
    styleUrls: ['./coach-search-result.component.scss'],
})
export class CoachSearchResultComponent {
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
