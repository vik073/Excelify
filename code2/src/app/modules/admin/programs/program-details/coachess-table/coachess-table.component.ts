import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ProgramBase } from '../../models/program.model';
import { ProgramsService } from '../../programs.service';

@Component({
  selector: 'app-coachees-table',
  templateUrl: './coachess-table.component.html',
  styleUrls: ['./coachess-table.component.scss']
})
export class CoacheesTableComponent implements OnInit {

  programId: any;

  tableColumns: ProgramBase[] = [{ label: '#', value: 'id' },
  { label: 'First Name', value: 'firstName' },
  { label: 'Last Name', value: 'lastName' },
  { label: '#Engagements', value: 'engagements' },
  { label: '#Sessions', value: 'sessions' }
  ]

  selected = 'oneonoonesession';
  EngagementType: any = ['Group-Session', '1:1 Session', 'Individiual']

  displayedColumns: any[] = ['firstName', 'lastName', 'engagements', 'sessions', 'action'];

  tableData: any[] = [
  ];
  VOForm: any;
  @Input() programDetails: any;
  coacheeData = [];

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder, private programsService: ProgramsService) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.programId = +params['id'];
        }
      );

    this.programsService.getProgramCoachees(this.programId).subscribe(res => {
      console.log(res);
      this.coacheeData = res?.data;
      if (res?.data?.length > 0) {
        this.programsService.coacheeSideBarData.next(res?.data[0]);
      }
      res.data?.forEach(element => {
        this.tableData.push({
          id: element.userId, firstName: element.firstName,
          lastName: element.lastName, engagements: element.engagementCount, sessions:
            ((+element.groupSessionCount) + (+element.oneOnOneSessionCount))
        })
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

    });


    this.VOForm = this.fb.group({
      VORows: this.fb.array([])
    });
  }

  selectCoacheeRow(event: any) {
    let value = this.coacheeData.find(i => i.userId == event?.id);
    this.programsService.coacheeSideBarData.next(value);
  }

}
