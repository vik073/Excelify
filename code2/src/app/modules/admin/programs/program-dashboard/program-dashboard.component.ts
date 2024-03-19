import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { Program } from './program.types';
import { ProgramDashboardService } from './program-dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletedDialogComponent } from './deleted-dialog/deleted-dialog.component';
import { environment } from 'environments/environment';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FuseNavigationService } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import * as cloneDeep from 'lodash';
import { countDays } from 'app/shared/common/common-method';

@Component({
    selector: 'program-dashboard',
    templateUrl: './program-dashboard.component.html',
    styleUrls: ['./program-dashboard.component.scss'],
})
export class ProgramDashboardComponent implements OnInit {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    drawerMode: 'side' | 'over';
    selectedTask: Task;
    programArray: Program[];
    searchText: string = '';
    masterArray: Program[];
    pageTitle: string = 'Programs'
    pageDescription: string = 'Empowering goals through powerful engagements'
    starRating: any = 4;
    sortedDateArray: Program[];
    createProgram: boolean = false;
    profilePicPath: string = environment.profilePicPath;
    nav_position: string = 'start';
    drawerOpened: boolean = false;
    showSaveIcon = false;
    showCancelIcon = false;
    format = 'dd/MM/yyyy';
    managerList = [];
    selectedManagerId = 0;
    allProgramArray: any = [];

    @Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();


    constructor(private programService: ProgramDashboardService,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        public dialog: MatDialog, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.getManagerList();
        this.getAllProgram();
    }

    getManagerList() {
        this.programService.getManagers().subscribe(res => {
            console.log(res);
            this.managerList = res;
        });
    }

    numSequence(n: number): Array<number> {
        return Array(n);
    }

    onSearchTextEntered(searchValue: string) {
        this.searchText = searchValue.toLowerCase();
        this.allProgramArray = cloneDeep(this.masterArray);
        this.programArray = this.allProgramArray.__wrapped__;
        if (searchValue !== '') {
            this.programArray = this.programArray.filter(item => item.programTitle?.toLowerCase().includes(this.searchText));
        }
    }

    createProgramEvent(event: any) {
        this.createProgram = true;
    }

    getAllProgram() {
        console.log('getAllProgram called');
        this.programService.getAllPrograms().subscribe((response: any) => {
            if (response && response.result == 'SUCCESS') {

                console.log('server data : ' + JSON.stringify(response.data));
                this.programArray = response.data;
                this.masterArray = this.programArray;

                this.programArray.map(item => {
                    item.countDays = countDays(item.endDate);
                })

                console.log(
                    ' Program Array length ' + this.programArray.length
                );
                console.log(' Master Array length ' + this.masterArray.length);
            }
        });
    }

    toggle(toggleValue: boolean) {

        if (toggleValue == true) {
            this.programArray = this.masterArray.filter(
                (data) => data.status == 'Active'
            );
            console.log(' Program Array length ' + this.programArray.length);
            console.log(' Master Array length ' + this.masterArray.length);
        } else {
            this.programArray = this.masterArray;
        }
    }

    onTogglePosition(position: string) {
        this.nav_position = position === 'start' ? 'end' : 'start';

    }

    sortStartDate(sortStartValue: boolean) {
        if (sortStartValue == true) {
            this.programArray = this.programArray.sort((a, b) =>
                a.startDate.localeCompare(b.startDate)
            );
        }
    }

    onBackdropClicked(): void {
        this.drawerOpened = false;
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Create task
     *
     * @param type
     */
    addSelection(type: 'coachee' | 'session' | 'engagement', id: any): void {

        // Go to the new task
        this._router.navigate(['./', id], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    sortEndDate(sortEndValue: boolean) {
        if (sortEndValue == true) {
            this.programArray = this.programArray.sort((a, b) =>
                a.endDate.localeCompare(b.endDate)
            );
        }
    }

    openDialog(): void {
        this.dialog.open(DeletedDialogComponent, {
            width: '250px',
        });
    }

    createTask(type: any, id: any): void {

        this.drawerOpened = true;
        // Go to the new task
        this._router.navigate(['./' + type, id], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    onEdit(program: any) {
        program.isEditable = true;
        var startDate = new Date(program.startDate);
        program.startDate = startDate.toISOString();
        var endDate = new Date(program.endDate);
        program.endDate = endDate.toISOString();
        this.selectedManagerId = 0;
    }

    onCancel(program: any) {
        program.isEditable = false;
    }

    onStartDateChange(data: any, program: any): void {
        console.log(data, program);
        program.startDate = new Date(data).toISOString();
        program.countDays = countDays(program.endDate);
    }

    onEndDateChange(data: any, program: any): void {
        console.log(data, program);
        program.endDate = new Date(data).toISOString();
        program.countDays = countDays(program.endDate);
    }

    // countDays(program: any) {
    //     const date1: any = new Date(program?.startDate);
    //     const date2: any = new Date(program?.endDate);
    //     const diffTime = Math.abs(date1 - date2);
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //     return diffDays;
    // }

    onProgramNameChange(program: any, event) {
        console.log(event.target.value);
        program.programTitle = event.target.value;
    }

    onDescriptionChange(program: any, event) {
        console.log(event.target.value);
        program.description = event.target.value;
    }

    saveProgram(program: any) {

        if (this.selectedManagerId == 0) {
            this.toastr.error('Please select one manager.');
            return;
        }

        const obj = {
            programId: program.programId,
            managerId: this.selectedManagerId,
            programName: program.programTitle,
            colorCode: "Teal",
            startDate: program?.startDate,
            endDate: program.endDate,
            description: program.description,
            coacheeList: []
        };

        this.programService.updateProgram(obj).subscribe({
            next: res => {
                console.log(res);
                this.toastr.success('Program updated successfully.');
                program.isEditable = false;
            }, error: e => {
                this.toastr.error('Failed to update program.');
            }
        });
    }
}
