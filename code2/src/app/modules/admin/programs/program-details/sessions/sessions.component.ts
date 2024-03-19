import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProgramBase } from '../../models/program.model';
import { ProgramsService } from '../../programs.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  programId: any;
  isLoading = true;
  displayedColumns: any[] = ['name', 'engagement', 'type', 'status', 'sessionDate', 'attendence', 'action'];

  tableColumns: ProgramBase[] = [{ label: 'Name', value: 'name' },
  { label: 'Engagement', value: 'engagement' },
  { label: 'Type', value: 'type' },
  { label: 'Status', value: 'status' },
  { label: 'Session Date', value: 'sessionDate' },
  { label: 'Attendence', value: 'attendence' }
  ]
  tableData: any[] = [];
  VOForm: any;
  sessionType: any = ['Group-Session', '1:1 Session'];
  selected = 'all';
  @Output() changeSessionRow: EventEmitter<any> = new EventEmitter<any>();

  sessionData: any;
  oneOnOneSession = [];
  groupSession = [];


  constructor(private route: ActivatedRoute,
    private fb: FormBuilder, private programsService: ProgramsService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.programId = +params['id'];
        }
      );

    this.programSession();
  }

  programSession() {
    this.programsService.getProgramSessions(this.programId).subscribe(res => {
      this.programsService.sessionDetail.next({ isUpcomingSession: true, data: res?.data });
      this.sessionData = res?.data;
      res?.data?.sessionList?.forEach(element => {
        if (element.sessionType === 'Group') {
          this.groupSession.push(element);
        } else {
          this.oneOnOneSession.push(element);
        }
        this.tableData.push({
          id: element.sessionId,
          name: element.sessionName,
          engagement: element.engagementName,
          type: element.sessionType,
          status: element.sessionStatus,
          sessionDate: element.sessionDate,
          attendence: element.attendance,
          edit: true

        });
      });
      this.VOForm = this.fb.group({
        VORows: this.fb.array(this.tableData.map(val => this.fb.group({
          id: new FormControl(+val.id),
          name: new FormControl(val.name),
          engagement: new FormControl(val.engagement),
          type: new FormControl(val.type),
          status: new FormControl(val.type),
          sessionDate: new FormControl(val.sessionDate),
          attendence: new FormControl(val.attendence),
          edit: new FormControl(val.edit),
          isEditable: new FormControl(true),
          isNewRow: new FormControl(false),
        })
        ))
      });
      this.isLoading = false;

      //this.changeSessionRow.emit(res?.data?.upcomingSessions); 
    });

    this.VOForm = this.fb.group({
      VORows: this.fb.array([])
    });
  }

  onChangeFilter(type: string) {
    this.tableData = [];
    this.VOForm = this.fb.group({
      VORows: this.fb.array([])
    });
    if (type === 'all') {
      this.sessionData?.sessionList?.forEach(element => {
        this.tableData.push({
          id: element.sessionId,
          name: element.sessionName,
          engagement: element.engagementName,
          type: element.sessionType,
          status: element.sessionStatus,
          sessionDate: element.sessionDate,
          attendence: element.attendance,
          edit: true
        });
      });
    } else if (type === 'oneonoonesession') {
      this.oneOnOneSession?.forEach(element => {
        this.tableData.push({
          id: element.sessionId,
          name: element.sessionName,
          engagement: element.engagementName,
          type: element.sessionType,
          status: element.sessionStatus,
          sessionDate: element.sessionDate,
          attendence: element.attendance,
          edit: true
        });
      });
    } else {
      this.groupSession?.forEach(element => {
        this.tableData.push({
          id: element.sessionId,
          name: element.sessionName,
          engagement: element.engagementName,
          type: element.sessionType,
          status: element.sessionStatus,
          sessionDate: element.sessionDate,
          attendence: element.attendance,
          edit: true
        });
      });
    }

    this.VOForm = this.fb.group({
      VORows: this.fb.array(this.tableData.map(val => this.fb.group({
        id: new FormControl(+val.id),
        name: new FormControl(val.name),
        engagement: new FormControl(val.engagement),
        type: new FormControl(val.type),
        status: new FormControl(val.type),
        sessionDate: new FormControl(val.sessionDate),
        attendence: new FormControl(val.attendence),
        edit: new FormControl(val.edit),
        isEditable: new FormControl(true),
        isNewRow: new FormControl(false),
      })
      ))
    });

  }

  updateSession(form: any) {
    console.log(form);

    const obj = {
      sessionId: form.value?.VORows[0].id,
      sessionName: form.value?.VORows[0].name,
      description: '',
    }

    this.programsService.updateSession(obj).subscribe({
      next: res => {
        console.log(res);
        this.toastr.success('Session updated successfully.');
      }, error: e => {
        this.toastr.error('Failed to update session.');
      }
    });
  }

  selectSessionRow(event: any) {
    let value = this.sessionData.sessionList.find(i => i.sessionId == event?.id);
    this.programsService.sessionDetail.next({ isUpcomingSession: false, data: value });

  }

  programEngagement(data: any) {
    this.tableData = [];
    // if(!(data === 'all')){

      
    // } else {
    //   this.tableData.filter(element=> element.type === )

    // }
    

  }

}


