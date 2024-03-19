import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Program } from '../models/program.model';
import { ProgramsService } from '../programs.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-program',
    templateUrl: './create-program.component.html',
    styleUrls: ['./create-program.component.scss'],
})
export class CreateProgramComponent implements OnInit {
    programArray: Program[];

    coaches = new FormControl();
    coachees = new FormControl();
    @Input() coachesList: any;
    @Input() coacheesList: any;
    @Input() compentencies: any;
    @Input() programMangers: any;
    @Input() selectedCompentencies: any[];
    @Input() selectedCoaches: any[];
    @Input() selectedCoachees: any[];
    profilePicPath: string = environment.profilePicPath;

    public programForm: FormGroup;

 


    visible = true;
    selectable = true;
    removable = true;

    /*set the separator keys.*/

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    /*create the tags list.*/

    Tags: string[] = [];


    /**
     * Constructor
     */
    constructor( private programService: ProgramsService , private router: Router, private fb: FormBuilder
    ) { }


    ngOnInit(): void { 
        this.programForm = new FormGroup({
            programName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            programManager: new FormControl('', [Validators.required]),
            profile : new FormControl('', [Validators.required]),
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required]),
            compentenciesControl: new FormControl(''),
            coaches: new FormControl('', [Validators.required]),
            programDescription: new FormControl('', [Validators.required]),
            coachees: new FormControl('', [Validators.required]),
            tags: new FormControl(''),
            });
    }

    getAvatarUrl(id: any, type: string) {
        

        var selectedList = (type === 'coach') ? this.coachesList.filter(Data => Data.id === id) : this.coacheesList.filter(Data => Data.userId === id);

        return selectedList[0].profilePic ? this.profilePicPath + selectedList[0].profilePic : selectedList[0].name.charAt(0);
    }




    onCompentenciesRemoved(compentency: string) {
        
        const compentencies = this.selectedCompentencies as string[];
        this.removeFirst(compentencies, compentency);
        this.selectedCompentencies = compentencies;
        this.programForm.controls.compentenciesControl.setValue(compentencies); // To trigger change detection
        this.programService.onSelectedCompentenciesChanged.next(this.selectedCompentencies);
    }
    
      private removeFirst<T>(array: T[], toRemove: T): void {
        const index = array.indexOf(toRemove);
        if (index !== -1) {
          array.splice(index, 1);
        }
      }
      
      public myError = (controlName: string, errorName: string) =>{ 
        
        return this.programForm.controls[controlName].hasError(errorName);
        }


        toggleSelectedCompentency(id): void {

    
            // First, check if we already have that contact as selected...
            if (this.selectedCompentencies.length > 0) {
                const index = this.selectedCompentencies.indexOf(id);
    
                if (index !== -1) {
                    this.selectedCompentencies.splice(index, 1);
                    this.programService.onSelectedCompentenciesChanged.next(this.selectedCompentencies);
                    return;
                }
            }
    
            this.selectedCompentencies.push(id);
            this.programService.onSelectedCompentenciesChanged.next(this.selectedCompentencies);
    
        }
    toggleSelectedCoach(id): void {

    
        // First, check if we already have that contact as selected...
        if (this.selectedCoaches.length > 0) {
            const index = this.selectedCoaches.indexOf(id);

            if (index !== -1) {
                this.selectedCoaches.splice(index, 1);
                this.programService.onSelectedCoachesChanged.next(this.selectedCoaches);
                return;
            }
        }

        this.selectedCoaches.push(id);
        this.programService.onSelectedCoachesChanged.next(this.selectedCoaches);

    }

    toggleSelectedCoachee(id): void {
        if (this.selectedCoachees.length > 0) {
            const index = this.selectedCoachees.indexOf(id);

            if (index !== -1) {
                this.selectedCoachees.splice(index, 1);
                this.programService.onSelectedCoacheesChanged.next(this.selectedCoachees);
                return;
            } 
        }
        this.selectedCoachees.push(id);
        this.programService.onSelectedCoacheesChanged.next(this.selectedCoachees);

    }

    /*our custom add method which will take
    matChipInputTokenEnd event as input.*/
    add(event: MatChipInputEvent): void {

        /*we will store the input and value in local variables.*/

        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {

            this.Tags.push(value);
        }

        if (input) {

            input.value = '';
        }
    }

    /*custom method to remove a tag.*/

    remove(tag: string): void {
        const index = this.Tags.indexOf(tag);

        if (index >= 0) {

            /*the tag of a particular index is removed from the tag list.*/

            this.Tags.splice(index, 1);
        }
    }

    OnSubmit() {


        let payload = {
            "programId": -1,
            "managerId": this.programForm.controls['programManager'].value,
            "programName": this.programForm.controls['programName'].value,
            "endDate": this.programForm.controls['endDate'].value.toDateString(),
            "startDate": this.programForm.controls['startDate'].value.toDateString(),
            "description": this.programForm.controls['programDescription'].value,
            "bgImage": this.programForm.controls['profile'].value, 
            "coacheeList": this.selectedCoachees,
            "coachList": this.selectedCoaches,
            "competencyList": this.selectedCompentencies,
            "tagList": this.Tags

        }

        
        this.programService.createProgram(payload).subscribe(data=>{
            this.router.navigateByUrl('/programs');

        })
    }
}
