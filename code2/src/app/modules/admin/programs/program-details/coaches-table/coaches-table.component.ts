import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ProgramBase } from '../../models/program.model';
import { ProgramsService } from '../../programs.service';

@Component({
  selector: 'app-coaches-table',
  templateUrl: './coaches-table.component.html',
  styleUrls: ['./coaches-table.component.scss']
})
export class CoachesTableComponent implements OnInit {

  programId: any;

  tableColumns: ProgramBase[] = [{ label: '#', value: 'id' },
  { label: 'First Name', value: 'firstName' },
  { label: 'Last Name', value: 'lastName' },
  { label: '#Engagements', value: 'engagements' },
  { label: '#Sessions', value: 'sessions' }
  ];
  @Output() changeCoachRow: EventEmitter<any> = new EventEmitter<any>();

  selected = 'oneonoonesession';
  EngagementType: any = ['Group-Session', '1:1 Session', 'Individiual']

  displayedColumns: any[] = ['firstName', 'lastName', 'engagements', 'sessions', 'action'];

  tableData: any[] = [];
  VOForm: any;
  coachData = [];

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder, private programsService: ProgramsService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.programId = +params['id'];
        }
      );

    this.VOForm = this.fb.group({
      VORows: this.fb.array([])
    });
    this.getCoaches();
  }

  getCoaches() {
    this.programsService.getProgramCoaches(this.programId).subscribe(res => {
      console.log(res);
      this.coachData = res?.data;
      res?.data?.forEach(element => {
        this.tableData.push({
          id: element.userId,
          firstName: element.firstName,
          lastName: element.lastName,
          engagements: element.engagementCount,
          sessions: (+element.groupSessionCount) + (+element.oneOnOneSessionCount),
          groupSessions: element.groupSessionCount,
          oneOnOneSessions: +element.oneOnOneSessionCount,
          coachUpcomingSessions: element.coachUpcomingSessions,
          coachEmailId: element.coachEmailId,
          coachMobileNumber: element.coachMobileNumber,
          coachProfilePic: element.coachProfilePic,
          coachRating: +element.coachRating
        });
      });

      this.VOForm = this.fb.group({
        VORows: this.fb.array(this.tableData.map(val => this.fb.group({
          id: new FormControl(val.id),
          firstName: new FormControl(val.firstName),
          lastName: new FormControl(val.lastName),
          engagements: new FormControl(val.engagements),
          sessions: new FormControl(val.sessions),
          isEditable: new FormControl(true),
          isNewRow: new FormControl(false),
          isCoache: new FormControl(true),
        })
        ))
      });

      if (this.coachData.length > 0) {
        this.programsService.coachSideBarData.next(this.coachData[0]);
        //this.changeCoachRow.emit(this.coachData[0]);
      }
    });
  }

  selectCoachRow(event: any) {
    let value = this.coachData.find(i => i.userId == event?.id);
    this.programsService.coachSideBarData.next(value);
  }
}
