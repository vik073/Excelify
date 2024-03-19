import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { UserManagementService } from '../user-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  pathArr: string[];
  Users: any = [{ id: '01', name: 'user01' }, { id: '01', name: 'user01' }, { id: '01', name: 'user01' }]
  pageTitle: string = 'User Management'
  pageDescription: string = 'Add/Upload Users and Corporate Profile'
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', []),
    confirmPassword: new FormControl('', []),
    changePassword: new FormControl(''),
    role: new FormControl('', [Validators.required]),
    coachCheckbox: new FormControl(''),
    coacheeCheckbox: new FormControl(''),
    managerCheckbox: new FormControl(''),
    sendEmail: new FormControl(''),
    programId: new FormControl('', [])
  });
  fileControl: FormControl;
  file: any;
  maxSize: number = 16
  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string;
  isChecked: any;
  programList = [];
  isRoleSelected = false;
  isFormSumitted = false;
  //fileData

  constructor(private router: Router, private userManagementService: UserManagementService, private toastr: ToastrService) {
    this.fileControl = new FormControl(this.file, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ])
  }

  ngOnInit(): void {

    var t = this.router.routerState.snapshot.url;
    this.pathArr = t.split('/');

    this.userManagementService.getProgramList().subscribe(res => {
      console.log(res);
      this.programList = res;
    });

    this.userForm.controls.role?.valueChanges.subscribe(res => {
      this.isRoleSelected = true;
    })
  }



  OnSubmit() {
    // let payload = {
    //   "userId": -1,
    //   "firstName": this.userForm.controls['firstName'].value,
    //   "lastName": this.userForm.controls['lastName'].value,
    //   "email": this.userForm.controls['email'].value,
    //   "password": this.userForm.controls['password'].value,
    //   "confirmPassword": this.userForm.controls['confirmPassword'].value,
    //   // "changePassword": this.userForm.controls['changePassword'].value,
    //   "role": this.userForm.controls['role'].value
    // }
    this.isFormSumitted = true;
    if (this.userForm.valid) {
      let payload = {
        "userDetails":
          this.isChecked ?
            this.userForm.controls['email'].value?.split(',')
            : [
              this.userForm.controls['firstName'].value +' '+ this.userForm.controls['lastName'].value + ':'
              + this.userForm.controls['email'].value
            ],
        "role": this.userForm.controls['role'].value,
        "programId": this.userForm.controls['programId'].value,
      }

      console.log(payload);
      this.userManagementService.createUser(payload).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success('User added successfully.');
          this.router.navigateByUrl('/user-management');
        }, error: e => {
          this.toastr.error('Failed to save user.');
        }
      });
    } else {
      this.toastr.info('Please fill are required field.');
    }
  }

  onFileSave() {
    console.log(this.fileControl.value);
    if (this.fileControl.value != null) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        let jsonData: any = (JSON.parse(fileReader.result.toString()));
        let sCount = 0;
        let fCount = 0;

        jsonData?.forEach(element => {
          console.log(element);
          let payload = {
            "userDetails": [
              element.firstname + element.lastnamee + ':'
              + element.email
            ],
            "role": element.role,
            "programId": element.programId,
          }
          this.userManagementService.createUser(payload).subscribe({
            next: data => {
              sCount++;
              console.log(data);
              if (sCount == jsonData.length) {
                this.toastr.success('Users added successfully.');
              }

              // this.router.navigateByUrl('/user-management');
            }, error: e => {
              fCount++;
              if (fCount == jsonData.length) {
                this.toastr.error('Failed to save users.');
              }
            }
          });
        });

      }
      fileReader.readAsText(this.fileControl.value, "UTF-8");
    } else {
      this.toastr.info('Pleae upload JSON file.');
    }
  }

}

