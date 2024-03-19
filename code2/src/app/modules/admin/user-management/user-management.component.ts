import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { UserManagementService } from './user-management.service';
import * as cloneDeep from 'lodash';

@Component({
    selector: 'user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
    enteredSearchValue: string = '';
    toggleValue: boolean = true;
    sortStartValue: boolean = true;
    profilePicPath: string = environment.profilePicPath;
    sortEndValue: boolean = true;
    userTypes: any = ['Admin', 'coach', 'coachee', 'Program Manger']

    pageTitle: string = 'User Management'
    pageDescription: string = 'Add/Upload Users and Corporate Profile'
    userDetails: any;
    loadMore: boolean = false;

    userArray = [];
    selectedRole = [];
    /**
     * Constructor
     */
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private userManagementService: UserManagementService
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

    ngOnInit(): void {
        this.userManagementService.getAllUsers().subscribe(data => {
            this.userDetails = data;
            this.userArray = data;
        });
    }

    numSequence(n: number): Array<number> {
        return Array(n);
    }

    toggle(roleName, $event) {
        
        if (!this.selectedRole.includes(roleName) && $event.checked) {
            this.selectedRole.push(roleName.toLowerCase());
        } else {
            this.selectedRole = this.selectedRole.filter((item) => {
                return item !== roleName.toLowerCase();
            });
        }

        this.userDetails = cloneDeep(this.userArray);
        this.userDetails = this.userDetails.__wrapped__;
        if (this.selectedRole.length > 0) {
            this.userDetails = this.userDetails.filter(item => this.selectedRole.includes(item.roleName.toLowerCase()));
        }
    }

    loadMoreCards() {
        this.loadMore = true;
    }

    onTogglePosition() {

    }

    sortAtoZ() {
        this.userDetails = this.userDetails.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    sortZtoA() {
        this.userDetails = this.userDetails.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    searchUser(value: string) {
        this.userDetails = cloneDeep(this.userArray);
        this.userDetails = this.userDetails.__wrapped__;
        if (value !== '') {
            this.userDetails = this.userDetails.filter(item => item.name?.toLowerCase().includes(value.toLowerCase()) || item.emailId?.toLowerCase().includes(value.toLowerCase()));
        }
    }
}
