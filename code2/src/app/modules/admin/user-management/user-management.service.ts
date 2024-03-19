import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { Constants } from 'app/helper/constants';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) { }

  getAllUsers(): any {
    return this._httpClient.get(
      Constants.GetCorpUserDetails
    );
  }

  getProgramList(): any {
    return this._httpClient.get(
      Constants.GetActiveProgramNames
    );
  }


  createUser(payload: any) {
    return this._httpClient.post(
      Constants.UploadCorpMembers,
      payload
    );
  }
}
