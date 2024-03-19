import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'environments/environment';
import { ProgramsService } from '../../../programs.service';

@Component({
  selector: 'app-coachee-side-bar',
  templateUrl: './coachee-side-bar.component.html',
  styleUrls: ['./coachee-side-bar.component.scss']
})
export class CoacheeSideBarComponent implements OnInit{

  coachees$: any;
  programArray: any[];
  coaches$: any;
  create: any = true;
  @Input() programDetails: any = false;
  profilePicPath: string = environment.profilePicPath;
  coacheData: any ;
  oneOnOneCount: any;
  groupSessionCount: any;
  data: any;
  taskprogress: any;
  goalprogress: string;
  
  constructor( private _programService: ProgramsService) { }

  ngOnInit(): void {

    this._programService.coacheeSideBarData.subscribe(res=>{
      this.coacheData = res;
      this.oneOnOneCount = +res.oneOnOneSessionCount;
      this.groupSessionCount = +res.groupSessionCount;
      this.data = res;
      this.taskprogress =  this.percentage(this.data?.completedTasks, this.data?.completedTasks + this.data?.pendingTasks);
      this.goalprogress = this.percentage(this.data?.completedGoals, this.data?.completedGoals + this.data?.pendingGoals);
this.taskCircle();
this.goalCircle();
this.attendenceCircle();
    });
  }

  numSequence(n: number): Array<number> {
    return Array(n);
}

getAvatarUrl(id: any, type: string) {
    var selectedList = (type === 'coach') ? this.coaches$.filter(Data => Data.id === id) : this.coachees$.filter(Data => Data.userId === id);
    return selectedList[0].profilePic ? this.profilePicPath + selectedList[0].profilePic : selectedList[0].name.charAt(0);
}

attendenceCircle() {
    
  const meters = document.querySelectorAll('svg[data-value] .attendance');
  meters.forEach((path: any) => {
    // Get the length of the path
    let length = path.getTotalLength();
    let progress:any =  this.data?.attendance


    let to = length * ((100 - progress) / 100);
    path.getBoundingClientRect();
    path.style.strokeDashoffset = Math.max(0, to);
  });

}
goalCircle() {
    
  const meters = document.querySelectorAll('svg[data-value] .goal');
  meters.forEach((path: any) => {
    // Get the length of the path
    let length = path.getTotalLength();
    let progress:any =  this.data?.goalsProgress;


    let to = length * ((100 - progress) / 100);
    path.getBoundingClientRect();
    path.style.strokeDashoffset = Math.max(0, to);
  });

}

percentage(percent, total) {
    
  return ((percent/ total) * 100).toFixed(2)
}


taskCircle() {

  debugger
    
  const meters = document.querySelectorAll('svg[data-value] .task');
  meters.forEach((path: any) => {
    // Get the length of the path
    let length = path.getTotalLength();
    let progress:any =  this.data?.taskProgress

    let to = length * ((100 - progress) / 100);
    path.getBoundingClientRect();
    path.style.strokeDashoffset = Math.max(0, to);
  });

}

}
