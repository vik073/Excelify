import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'environments/environment';
import { ProgramsService } from '../../../programs.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit {

  selectedDate: any;
  @Input() programDetails: any = false;
  @Input() upcomingSessionData: any = {};
  @Input() session: any = true;
  upcomingSession: any;
  isLoading = false;
  isUpcomingSession = true;
  sessionData: any;
  profilePicPath: string = environment.profilePicPath;
  oneOnOneCount: any;
  groupSessionCount: any;

  constructor(private programsService: ProgramsService) { }

  ngOnChanges(change: SimpleChanges) {
    ;
    this.upcomingSession = this.upcomingSessionData;
  }

  ngOnInit(): void {
    this.programsService.sessionDetail.subscribe(res => {
      console.log(res);
      if (res?.isUpcomingSession) {
        this.isUpcomingSession = true;
        this.upcomingSession = res?.data?.upcomingSessions;
      } else {
        this.isUpcomingSession = false;
        this.sessionData = res?.data;
      }
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
    this.oneOnOneCount = this.programDetails?.oneOnOneEngagements.length;
    this.groupSessionCount = this.programDetails?.groupEngagements.length;
  }


  numSequence(n: number): Array<number> {
    return Array(Math.floor(n));
  }

  onSelect(event) {
    console.log(event);
    this.selectedDate = event;
  }

  getAvatarUrl(id: any, type: string) {
    if (type === 'coach') {
      return this.profilePicPath + this.sessionData?.coachProfilePic;
    } else {
      var selectedList = this.sessionData?.coacheeInfo.filter(Data => Data.coacheeId === id);
      return selectedList[0].coacheeProfilePic ? this.profilePicPath + selectedList[0].coacheeProfilePic : selectedList[0].coacheName.charAt(0);
    }
  }

}
