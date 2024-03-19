import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ProgramsService } from '../programs.service';

@Component({
    selector: 'app-program-container',
    templateUrl: './program-container.component.html',
    styleUrls: ['./program-container.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProgramContainerComponent implements OnInit {
    dialogRef: any;
    hasSelectedContacts: boolean;
    competenciesExpand: any = 'short';
    coachesExpand: any = 'short';
    coacheesExpand: any = 'short';
    compentencies: any = [
        {
            'id': 'competency01',
            'name': 'Competency01',
        }, {
            'id': 'competency02',
            'name': 'Competency02',
        },
        {
            'id': 'competency04',
            'name': 'Competency04',
        }, {
            'id': 'competency05',
            'name': 'Competency05',
        },

    ];
    programMangers: any;
    filterCompentenciesListData: any;
    filterCoachListData: any;
    filterCoacheeListData: any;
    currentRoute: string;
    ;
    coaches: any = [];
    coachees: any;
    pageTitle: string = 'Programs'
    pageDescription: string = 'Empowering goals through powerful engagements'
    searchInput: FormControl;
    selectedCoaches: any[] = [];
    selectedCoachees: any[] = [];
    selectedCompentencies: any[] = [];

    pathArr: string[];

    constructor(
        private _programService: ProgramsService,
        private router: Router
    ) {
        this.searchInput = new FormControl('');
    }

    ngOnInit() {
        var t = this.router.routerState.snapshot.url;
        this.pathArr = t.split('/');
        this._programService.getAllCoaches();
        this._programService.getAllCoachees();
        this._programService.getAllCompetencies();
        this.getAllCoachees();
        this.getAllCoaches();
        this.getCompetencies();
        this.getProgramMangers();
        this._programService.onSelectedCompentenciesChanged.subscribe(data => {
            
            this.selectedCompentencies = data;
        })
        this._programService.onSelectedCoachesChanged.subscribe(data => {
            this.selectedCoaches = data;
        })
        this._programService.onSelectedCoacheesChanged.subscribe(data => {
            this.selectedCoachees = data;
        })
        this.router.events.subscribe(event=>  {
            
            if (event instanceof NavigationStart) {
                // Show progress spinner or progress bar
                console.log('Route change detected');
            }
    
            if (event instanceof NavigationEnd) {
                // Hide progress spinner or progress bar
                this.currentRoute = event.url;          
                console.log(event);
            }
    
            if (event instanceof NavigationError) {
                 // Hide progress spinner or progress bar
    
                // Present error to user
                console.log(event.error);
            }
        });
    }

    getAllCoaches() {
        this._programService.coaches.subscribe((data: any) => {
            this.coaches = data;
            this.filterCoachListData = this.coaches;
        });
    }

    getAllCoachees() {
        this._programService.coachees.subscribe((data: any) => {
            this.coachees = data;
            this.filterCoacheeListData = this.coachees;
        });
    }

    getCompetencies() {
        this._programService.compentencies.subscribe((data: any) => {
            this.compentencies = data;
            this.filterCompentenciesListData = this.compentencies;
        });
    }

    filterData(event:any): void {

        if (!event.query) {
            switch (event.searchType) {
                case 'competencies':
                    this.filterCompentenciesListData = this.compentencies
                    break;
                case 'coaches':
                    this.filterCoachListData = this.coaches;
                    break;
                case 'coachees':
                    this.filterCoacheeListData = this.coachees;
                    break;
            }
            return;
        } else {
            switch (event.searchType) {
                case 'competencies':
                    this.filterCompentenciesListData = this.compentencies.filter(compentency => compentency.name.toLowerCase().includes(event.query.toLowerCase()));
                    break;
                case 'coaches':
                    this.filterCoachListData = this.coaches.filter(coache => coache.name.toLowerCase().includes(event.query.toLowerCase()));
                    break;
                case 'coachees':
                    this.filterCoacheeListData = this.coachees.filter(coachee => coachee.name.toLowerCase().includes(event.query.toLowerCase()));
                    break;

            }

        }
    }


    addSelection(event: any) {
        switch (event.type) {
            case 'competencies':
                this._programService.onSelectedCompentenciesChanged.next(event.data);
                break;
            case 'coaches':
                this._programService.onSelectedCoachesChanged.next(event.data);
                break;
            case 'coachees':
                this._programService.onSelectedCoacheesChanged.next(event.data);
                break;
        }
    }

    getProgramMangers() {
        this._programService.getAllProgramManagers().subscribe((response: any) => {
            if (response) {
                
                console.log('server data coach : ' + JSON.stringify(response.data));
                this.programMangers = response;
            }
        });
    }

    viewMoreClick(event: any) {
        switch (event) {
            case 'competencies':
                this.competenciesExpand = 'expand';
                this.coachesExpand = 'hide';
                this.coacheesExpand = 'hide';
                break;
            case 'coaches':
                this.competenciesExpand = 'hide';
                this.coachesExpand = 'expand';
                this.coacheesExpand = 'hide';
                break;
            case 'coachees':
                this.competenciesExpand = 'hide';
                this.coachesExpand = 'hide';
                this.coacheesExpand = 'expand';
                break;
        }
    }
}
