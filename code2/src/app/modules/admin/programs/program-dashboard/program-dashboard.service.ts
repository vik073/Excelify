import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { Constants } from 'app/helper/constants';
@Injectable({
    providedIn: 'root',
})
export class ProgramDashboardService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    getAllPrograms(): any {
        return this._httpClient.get(
           Constants.GetAllProgram
        );
    }

    getManagers(): any {
        return this._httpClient.get(
            Constants.GetProgramManagers
        );
    }

    getProgramDetails(id: any): any {
        return this._httpClient.post(
            Constants.GetProgramDetails,
            { 'programId': id }
        );
    }

    updateProgram(obj: any) {
        return this._httpClient.post(
            Constants.CreateUpdateProgram,
            obj
        );
    }
}
