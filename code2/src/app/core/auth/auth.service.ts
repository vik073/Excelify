import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { Constants } from 'app/helper/constants';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    readonly rootUrl = environment.apiUrl;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(postModole): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        const url: string = `${this.rootUrl}/UserLogin`;

        var headers: HttpHeaders = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('No-Auth', 'True');

        return this._httpClient
            .post(this.rootUrl + '/token', postModole, { headers : headers})
            .pipe(
                switchMap((response: any) => {
                    //console.log('response:' + JSON.stringify(response));
                    if (response?.access_token) {
                        this.accessToken = response.access_token;
                        console.log('Token:' + this.accessToken);
                        this._authenticated = true;
                        //return this._httpClient.post(url);
                        //return of(response);
                        return this.userLogin('LOGIN_PASSWORD', null, null);
                    }

                    // Return a new observable with the response
                    // return of(response);
                })
            );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        console.log(
            'signInUsingToken.accessToken1:' +
                JSON.stringify(this.accessToken) +
                '   this._userService:' +
                this._userService
        );
        if (
            this.accessToken &&
            (this._userService == undefined ||
                this._userService.user == undefined)
        ) {
            this._authenticated = true;
            console.log(
                '   this._userService.user:' +
                    JSON.stringify(this._userService.user)
            );

            return this.userLoginWithToken('LOGIN_PASSWORD');
        } else {
            console.log('signInUsingToken.accessToken.Else return to login');

            return of(false);
        }
        /*
        return this._httpClient
            .post('api/auth/sign-in-with-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    console.log('response:' + JSON.stringify(response));
                    // Replace the access token with the new one if it's available on
                    // the response object.
                    //
                    // This is an added optional step for better security. Once you sign
                    // in using the token, you should generate a new one on the server
                    // side and attach it to the response object. Then the following
                    // piece of code can replace the token with the refreshed one.
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                        // Set the authenticated flag to true
                        this._authenticated = true;
                        return this.userLoginWithToken('LOGIN_PASSWORD');
                    } else if (this.accessToken && !this._userService) {
                        this._authenticated = true;
                        return this.userLoginWithToken('LOGIN_PASSWORD');
                    }
                    console.log(
                        'this._userService.user:' +
                            JSON.stringify(this._userService.user)
                    );
                    // Store the user on the user service
                    //this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );*/
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    userLoginWithToken(provider) {
        var obj = {
            provider: provider,
        };

        var newObj = JSON.stringify(obj);

        return this._httpClient
            .post(Constants.UserLogin, newObj)
            .pipe(
                switchMap((response: any) => {
                    console.log('response:' + JSON.stringify(response));
                    if (response?.message == 'Success') {
                        // Store the user on the user service
                        this._userService.user = response.user;
                        //this._userService.update(response.user);
                        console.log(
                            '_userService.user:' +
                                JSON.stringify(this._userService.get())
                        );
                        return of(this._userService.get());
                    } else {
                        // Return a new observable with the response
                        return of(false);
                    }
                })
            );
    }

    userLogin(provider, ipAddress, countryCode) {
        console.log(
            'provider:' +
                provider +
                ' ipAddress:' +
                ipAddress +
                ' countryCode:' +
                countryCode
        );
        var obj = {
            provider: provider,
            ipAddress: ipAddress != null ? ipAddress : '',
            countryCode: countryCode != null ? countryCode : '',
        };

        var newObj = JSON.stringify(obj);

        return this._httpClient
            .post(Constants.UserLogin, newObj)
            .pipe(
                switchMap((response: any) => {
                    console.log('response:' + JSON.stringify(response));
                    if (response?.message == 'Success') {
                        // Store the user on the user service
                        this._userService.user = response.user;
                        //this._userService.update(response.user);
                        console.log(
                            '_userService.user:' +
                                JSON.stringify(this._userService.get())
                        );
                        return of(this._userService.get());
                    } else {
                        // Return a new observable with the response
                        return of(false);
                    }
                })
            );
    }

    storeThirdPartyTokenInCache(provider, token) {
        localStorage.setItem('tpAuthProvider', provider);
        localStorage.setItem('tpAuthToken', token);
    }

    removeThirdPartyTokenFromCache() {
        localStorage.removeItem('tpAuthProvider');
        localStorage.removeItem('tpAuthToken');
    }
}
