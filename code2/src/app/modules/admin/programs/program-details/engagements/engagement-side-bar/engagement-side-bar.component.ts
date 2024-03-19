import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'environments/environment';
import { ChartComponent } from 'ng-apexcharts';
import { ToastrService } from 'ngx-toastr';
import { ProgramsService } from '../../../programs.service';
import { ChartOptions } from '../engagements.component';

@Component({
  selector: 'app-engagement-side-bar',
  templateUrl: './engagement-side-bar.component.html',
  styleUrls: ['./engagement-side-bar.component.scss']
})
export class EngagementSideBarComponent implements OnInit {
    coachees$: any;
    programArray: any[];
    @Input() createEngagement: any = false;
    @Input() programDetails: any = false;
    coaches$: any;
    profilePicPath: string = environment.profilePicPath;
    EngagementType: any = ['Group', 'One-On-One']
    @ViewChild("chart") chart: ChartComponent;
    @Output() addEngagementClick: EventEmitter<any> = new EventEmitter<any>();
    oneOnOneCount: number;
    groupSessionCount: number;
    public chartOptions: Partial<ChartOptions>;
    engagementForm = new FormGroup({
      name: new FormControl(''),
      engagementType: new FormControl('One-On-One', [Validators.required]),
      coaches: new FormControl('', [Validators.required]),
      coachees: new FormControl('', [Validators.required]),
      multipleCoachees: new FormControl(''),
    });
    currentCoach: any;
    selectedEngagementType: string = 'One-On-One';
    currentCoachee: any;
    programId = 0;
  
    get coaches(): any {
      return this.engagementForm.get('coaches');
    }
    get coachees(): any {
      return this.engagementForm.get('coachees');
    }
    get multipleCoachees(): any {
      return this.engagementForm.get('multipleCoachees');
    }
  
    constructor(private _programService: ProgramsService,
      private route: ActivatedRoute, private toastr: ToastrService) {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.programId = params['id'];
          }
        );
    }
  
    ngOnInit(): void {
      this._programService.getAllCoaches();
      this._programService.getAllCoachees()
      this.oneOnOneCount = this.programDetails?.oneOnOneEngagements.length;
      this.groupSessionCount = this.programDetails?.groupEngagements.length;
      this._programService.coachees.subscribe(data => {
        this.coachees$ = data
      })
      this._programService.coaches.subscribe(data => {
        this.coaches$ = data
      });
  
  
      this.engagementForm.controls.engagementType.valueChanges.subscribe(value => {
  
        if (value == 'One-On-One') {
          this.engagementForm.controls.name.setValidators(null);
          this.engagementForm.controls.multipleCoachees.setValidators(null);
        } else {
          this.engagementForm.controls.name.setValidators([Validators.required, Validators.maxLength(50)]);
          this.engagementForm.controls.multipleCoachees.setValidators([Validators.required]);
        }
  
        this.selectedEngagementType = value;
        this.engagementForm.controls.multipleCoachees.setValue('');
        this.engagementForm.controls.coachees.setValue('');
      })
    }
  
    numSequence(n: number): Array<number> {
      return Array(n);
    }
  
    OnCoachChange(event) {
  
      this.currentCoach = this.coaches$.find(option => option.id === event);
    }
  
    OnCoacheeChange(event) {
      this.currentCoachee = this.coachees$.find(option => option.userId === event);
    }
  
    save() {
      console.log(this.engagementForm);
  
      let obj = {};
  
      if (this.engagementForm.value?.engagementType !== 'One-On-One') {
        obj = {
          engagementType: this.engagementForm.value?.engagementType,
          programId: this.programId,
          coachId: this.engagementForm.value?.coaches,
          coacheeList: this.engagementForm.value?.multipleCoachees,
          name: this.engagementForm.value?.name
        }
      } else {
        obj = {
          engagementType: this.engagementForm.value?.engagementType,
          programId: this.programId,
          coachId: this.engagementForm.value?.coaches,
          coacheeList: this.engagementForm.value?.coachees
        }
      }
  
      this._programService.createEngagement(obj).subscribe({
        next: res => {
          this.createEngagement = false;
          this._programService.reloadProgramDetail.next(true);
          this.toastr.success('Engagement created successfully.');
        }, error: e => {
          this.toastr.error('Failed to save engagement.');
        }
      });
    }
  
    getAvatarUrl(id: any, type: string) {
      if (id) {
        var selectedList = (type === 'coach') ? this.coaches$.filter(Data => Data.id === id) : this.coachees$.filter(Data => Data.userId === id);
  
        return selectedList[0]?.profilePic ? this.profilePicPath + selectedList[0]?.profilePic : selectedList[0]?.name.charAt(0);
  
      }
    }
  
    cancelForm() {
      this.createEngagement = false;
      this.addEngagementClick.emit(false);
    }
  }
  
