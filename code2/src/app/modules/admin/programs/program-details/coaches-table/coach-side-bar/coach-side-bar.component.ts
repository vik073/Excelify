import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'environments/environment';
import { ProgramsService } from '../../../programs.service';
import { ChartOptions } from '../../program-details.component';

@Component({
  selector: 'app-coach-side-bar',
  templateUrl: './coach-side-bar.component.html',
  styleUrls: ['./coach-side-bar.component.scss']
})
export class CoachSideBarComponent implements OnInit {

  coachees$: any;
  programArray: any[];
  coaches$: any;
  create: any = true;
  profilePicPath: string = environment.profilePicPath;
  @Input() programDetails: any = false;
  @Input() coachData: any = {};
  public chartOptions: Partial<any>;
  rating = 0;

  coachDetails: any ;
  oneOnOneCount: number;
  groupSessionCount: number;
  constructor(private _programService: ProgramsService) { }


  ngOnInit(): void {
    this._programService.coachSideBarData.subscribe(res => {
      this.rating = res?.rating ?? 0;
      this.coachDetails = res;
      this.oneOnOneCount = +res?.oneOnOneSessionCount;
      this.groupSessionCount = +res?.groupSessionCount;
    })

  }

  numSequence(n: number): Array<number> {
    return Array(Math.floor(n));
  }

  getAvatarUrl(id: any, type: string) {
    var selectedList = (type === 'coach') ? this.coaches$.filter(Data => Data.id === id) : this.coachees$.filter(Data => Data.userId === id);
    return selectedList[0].profilePic ? this.profilePicPath + selectedList[0].profilePic : selectedList[0].name.charAt(0);
  }

}
