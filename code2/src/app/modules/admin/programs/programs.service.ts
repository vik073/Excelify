import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { Constants } from 'app/helper/constants';

@Injectable({
    providedIn: 'root',
})
export class ProgramsService {

    onSearchTextChanged: Subject<any>;
    onCoachesChanged: BehaviorSubject<any>;
    onSelectedCoachesChanged: BehaviorSubject<any>;
    onSelectedCoacheesChanged: BehaviorSubject<any>;
    onSelectedCompentenciesChanged: BehaviorSubject<any>;
    selectedCompentencies: any;
    onFilterChanged: Subject<any>;
    coaches: BehaviorSubject<any> = new BehaviorSubject([]);
    coachees: BehaviorSubject<any> = new BehaviorSubject([]);
    compentencies: BehaviorSubject<any> = new BehaviorSubject([]);
    reloadProgramDetail: Subject<any> = new Subject();
    sessionDetail: Subject<any> = new Subject();
    coacheeSideBarData: Subject<any> = new Subject();
    coachSideBarData: Subject<any> = new Subject();

    user: any;
    selectedCoaches: string[] = [];

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        // Set the defaults
        this.onSearchTextChanged = new Subject();
        this.onCoachesChanged = new BehaviorSubject([]);
        this.onSelectedCoachesChanged = new BehaviorSubject([]);
        this.onSelectedCoacheesChanged = new BehaviorSubject([]);
        this.onSelectedCompentenciesChanged = new BehaviorSubject([]);
        this.onFilterChanged = new Subject();
    }



    /**
     * Get All Programs
     *
     * @returns {Promise<any>}
     *
     */
    getAllPrograms(): any {
        return this._httpClient.get(
           Constants.GetAllProgram
        );
    }

    getAllCoaches(): any {
        this._httpClient.get(
            Constants.GetAllCorporateCoaches
        ).subscribe((response: any) => {
            if (response && response.result == 'SUCCESS') {
                this.coaches.next(response.data);

            }
        })
    }


    getAllCoachees(): any {
        this._httpClient.get(
            Constants.GetAllCorporateUsers
        ).subscribe((response: any) => {
            if (response && response.result == 'SUCCESS') {
                this.coachees.next(response.data);

            }
        })
    }

    getAllCompetencies(): any {
        this._httpClient.get(
            Constants.GetCompetencies
        ).subscribe((response: any) => {
            if (response && response.result == 'SUCCESS') {
                this.compentencies.next(response.data)

            }
        })
    }

    getAllProgramManagers(): any {
        return this._httpClient.get(
            Constants.GetProgramManagers
        );
    }

    createEngagement(engagementData: any) {
        return this._httpClient.post(
           Constants.CreateEngagement,
            engagementData
        );
    }


    toggleSelectedCoach(id): void {
        // First, check if we already have that contact as selected...
        if (this.selectedCoaches.length > 0) {
            const index = this.selectedCoaches.indexOf(id);

            if (index !== -1) {
                this.selectedCoaches.splice(index, 1);
                this.onSelectedCoachesChanged.next(this.selectedCoaches);
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedCoaches.push(id);

        // Trigger the next event
        this.onSelectedCoachesChanged.next(this.selectedCoaches);
    }

    addSelected(selectedList: any) {

        // this.selectedCoaches = [this.selectCoaches , ...selectedList];
        this.onSelectedCoachesChanged.next(this.selectedCoaches);

    }



    createProgram(payload: any) {
        return this._httpClient.post(
            Constants.CreateUpdateProgram,
            payload
        );
    }

    getProgramSessions(programId: number): any {

        return this._httpClient.post(
            Constants.GetProgramSessions,
            { 'programId': programId }
        );
    }

    getProgramCoaches(programId: number): any {
        return this._httpClient.post(
            Constants.GetProgramCoaches,
            { 'programId': programId }
        );
    }

    getProgramCoachees(programId: number): any {
        return this._httpClient.post(
            Constants.GetProgramCoachees,
            { 'programId': programId }
        );
    }

    /**
     * Deselect contacts
     */
    deselectContacts(): void {
        this.selectedCoaches = [];

        // Trigger the next event
        this.onSelectedCoachesChanged.next(this.selectedCoaches);
    }

    updateSession(sessionData: any) {
        return this._httpClient.post(
            Constants.UpdateSessionDetails,
            sessionData
        );
    }

    removeOneonOneEngagement(obj: any) {
        return this._httpClient.post(
            Constants.RemoveOneonOneEngagement,
            obj
        );
    }

    removeGroupEngagement(obj: any) {
        return this._httpClient.post(
            Constants.RemoveGroupEngagement,
            obj,
        );
    }

    addProgramCoachees(obj: any) {
        return this._httpClient.post(
            Constants.AddProgramUsers,
            obj
        );
    }

    addProgramCoaches(obj: any) {
        return this._httpClient.post(
            Constants.Addcoaches,
            obj
        );
    }

    getProgramInsights(programId: number): any {
        return this._httpClient.post(
            Constants.GetProgramInsight,
            { 'programId': programId }
        );
    }
}
