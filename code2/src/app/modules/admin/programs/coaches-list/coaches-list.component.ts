import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ProgramsService } from '../programs.service';

@Component({
    selector: 'app-coaches-list',
    templateUrl: './coaches-list.component.html',
    styleUrls: ['./coaches-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CoachesListComponent implements OnInit, OnChanges {


    programId = 0;
    showAll = false;
    @Input() type: string;
    @Input() viewMore: any = 'short';
    @Input() selectedList: any[];
    @Input() filterListData: any[] = [];
    @Output() viewMoreClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() addSelection: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchFilter: EventEmitter<any> = new EventEmitter<any>();
    temporarySelectedList: any[] = [];
    profilePicPath: string = environment.profilePicPath;
    reloadUI = false;

    constructor(private _programsService: ProgramsService, private route: ActivatedRoute, private toastr: ToastrService) {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.programId = params['id'];
                }
            );
    }

    ngOnInit(): void {
        // this.selectedList.forEach(data => {
        //     this.temporarySelectedList.push(data)
        // });

        switch (this.type) {
            case 'competencies':
                this._programsService.onSelectedCompentenciesChanged.subscribe(data => {

                    this.selectedList = data;
                    this.temporarySelectedList = [];
                    this.updateSelection(data);
                });
                break;
            case 'coaches':
                this._programsService.onSelectedCoachesChanged.subscribe(data => {
                    this.selectedList = data;
                    this.temporarySelectedList = [];
                    this.updateSelection(data);
                });
                break;
            case 'coachees':
                this._programsService.onSelectedCoacheesChanged.subscribe(data => {
                    this.selectedList = data;
                    this.temporarySelectedList = [];
                    this.updateSelection(data);
                })
                break;
        }

    }

    updateSelection(data: any) {
        data.forEach(dataFind => {
            const index = this.temporarySelectedList.indexOf(dataFind);
            if (index === -1) {
                this.temporarySelectedList.push(dataFind)
            }
        });
    }

    // updateCoachesSelection(data: any) {
    //     data.forEach(dataFind => {
    //         const index = this.temporarySelectedList.indexOf(dataFind);
    //         if (index === -1) {
    //             this.temporarySelectedList.push(dataFind)
    //         }
    //     });
    // }

    // updateCoacheesSelection(data: any) {
    //     data.forEach(dataFind => {
    //         const index = this.temporarySelectedList.indexOf(dataFind);
    //         if (index === -1) {
    //             this.temporarySelectedList.push(dataFind)
    //         }
    //     });
    //     console.log(this.temporarySelectedList);
    //     const obj = { programId: this.programId, coacheeList: this.temporarySelectedList }
    //     this._programsService.addProgramCoachees(obj).subscribe({
    //         next: (res) => {
    //             console.log(res);
    //         }
    //     });
    // }

    ngOnChanges(changes: SimpleChanges): void {

    }


    viewMoreExpand(type: any) {

        this.viewMoreClick.emit(type);
    }



    toggleSelectedCoach(id, event): void {

        if (!event.checked) {
            const index = this.temporarySelectedList.indexOf(+id);

            if (index !== -1) {
                this.temporarySelectedList.splice(index, 1);
                return;
            }
        }
        this.temporarySelectedList.push(+id);

    }

    addSelected() {
        // this.addSelection.emit({
        //     data: this.temporarySelectedList,
        //     type: this.type
        // });
        console.log(this.temporarySelectedList, this.type);
        if (this.type == 'coaches') {
            const obj = { programId: this.programId, coacheeList: this.temporarySelectedList }
            this._programsService.addProgramCoaches(obj).subscribe({
                next: (res) => {
                    console.log(res);
                    this.toastr.success('Coache added successfully.');
                },
                error: e=>{
                    this.toastr.error('Failed to add coach.');
                }
            });
        } else {
            const obj = { programId: this.programId, coacheeList: this.temporarySelectedList }
            this._programsService.addProgramCoachees(obj).subscribe({
                next: (res) => {
                    console.log(res);
                    this.toastr.success('Coachee added successfully.');
                },
                error: e=>{
                    this.toastr.error('Failed to add coachee.');
                }
            });
        }
    }

    /**
     * Filter the chats
     *
     * @param query
     */
    filterData(query: string, searchType: any): void {

        this.searchFilter.emit({ query: query, searchType: searchType });
    }

    clearSelections(){
        this.selectedList = [];
        this.temporarySelectedList = [];
        this.filterListData = this.filterListData;
    }
}
