import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PeriodicElement } from 'app/shared/table/table.component';
import { ChartComponent } from 'ng-apexcharts';
import { ProgramBase } from '../../models/program.model';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ProgramsService } from '../../programs.service';
import { ToastrService } from 'ngx-toastr';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss']
})
export class EngagementsComponent implements OnInit {

  programId: any;
  isLoading = true;
  editVisible = false;
  @Input() programDetails: any;
  @Output() addEngagementClick: EventEmitter<any> = new EventEmitter<any>();

  tableColumns: ProgramBase[] = [{ label: 'Name', value: 'name' },
  { label: 'Type', value: 'type' },
  { label: 'Last Session', value: 'lastSession' },
  { label: 'Next Session', value: 'nextSession' },
  { label: 'Total', value: 'sessionsCount' }
  ]

  engagementData: any = [];
  selected: any = 'all';
  EngagementType: any = ['Group-Session', '1:1 Session', 'Individiual']


  displayedColumns: any[] = ['name', 'type', 'lastSession', 'nextSession', 'sessionsCount', 'action'];


  tableData: PeriodicElement[] = [
  ];


  VOForm: any;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder, private programsService: ProgramsService, private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = true;
    this.programEngagement(this.selected);
  }

  ngOnInit(): void {
    //this.programEngagement();
  }

  // sessionTypeChange(data: any) {
  //   this.tableData = [];
  //   if (data == 'oneonoonesession') {
  //     this.programDetails?.oneOnOneEngagements?.forEach(element => {
  //       this.tableData.push({ ...element, type: '1:1 Sessions', id: element.engagementId })
  //     });
  //   } else {
  //     this.programDetails?.groupEngagements?.forEach(element => {
  //       this.tableData.push({ ...element, type: 'Group Session', id: element.engagementId });
  //     });
  //   }
  // }

  programEngagement(data: any) {
    this.tableData = [];
    if(!(data === 'all')){

      if (data == 'oneonoonesession') {

        this.editVisible = false;
        this.programDetails?.oneOnOneEngagements?.forEach(element => {
          this.tableData.push({ ...element, type: '1:1 Sessions', id: element.engagementId, edit: false })
        });
      } else {
        
        this.editVisible = true;
        this.programDetails?.groupEngagements?.forEach(element => {
          this.tableData.push({ ...element, type: 'Group Session', id: element.engagementId , edit: true});
        });
      }
    } else {
      this.tableData = [];

      this.programDetails?.oneOnOneEngagements?.forEach(element => {
        this.tableData.push({ ...element, type: '1:1 Sessions', id: element.engagementId, edit: false })
      });

      this.programDetails?.groupEngagements?.forEach(element => {
        this.tableData.push({ ...element, type: 'Group Session', id: element.engagementId , edit: true});
      });

    }
    

    this.engagementData = this.programDetails?.groupEngagements;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.programId = +params['id'];
        }
      );
    this.VOForm = this.fb.group({
      VORows: this.fb.array([])
    });

    this.VOForm = this.fb.group({
      VORows: this.fb.array(this.tableData.map(val => this.fb.group({
        id: new FormControl(val['id']),
        name: new FormControl(val['engagementName']),
        type: new FormControl(val.type),
        lastSession: new FormControl(val.lastSession),
        nextSession: new FormControl(val.nextSession),
        sessionsCount: new FormControl(val['sessionsCount']),
        edit: new FormControl(val['edit']),
        isEditable: new FormControl(true),
        isNewRow: new FormControl(false),
      })
      ))
    });

    this.isLoading = false;
  }

  addEngagement() {
    this.addEngagementClick.emit(true);
  }

  removeEngagement(formData: any) {
    const obj = { engagementId: formData?.id };
    if (formData?.type == '1:1 Sessions') {

      this.programsService.removeOneonOneEngagement(obj).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('One to one session deleted successfully.');
          this.programsService.reloadProgramDetail.next(true);
        }
      });
    } else {
      this.programsService.removeGroupEngagement(obj).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Group session deleted successfully.');
          this.programsService.reloadProgramDetail.next(true);
        }
      });
    }
  }
}
