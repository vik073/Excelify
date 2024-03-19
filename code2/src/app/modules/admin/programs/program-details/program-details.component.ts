import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ChartComponent, ApexResponsive } from 'ng-apexcharts';
import { ProgramDashboardService } from '../program-dashboard/program-dashboard.service';
import { ProgramsService } from '../programs.service';
import { countDays } from 'app/shared/common/common-method';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: any;
};

@Component({
  selector: 'program-dashboard',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss'],
})



export class ProgramDetailsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  createEngagement: boolean = false;
  pageTitle: string = 'Programs'
  pageDescription: string = 'Empowering goals through powerful engagements'
  pathArr: any;
  programDetails: any = [];
  coaches$: any = [];
  coachees$: any = [];
  profilePicPath: string = environment.profilePicPath;
  programId: number;
  selectedBar: any;
  coachDetail: any;
  oneOnOneCount: any;
  groupSessionCount: any;
  sessionDetail: any;
  remainingDays = 0;
  /**
   * Constructor
   */
  constructor(
    private programService: ProgramDashboardService,
    private _programService: ProgramsService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _router: Router,
    private activateRoute: ActivatedRoute,
    private pService: ProgramsService
  ) {
    this.matIconRegistry.addSvgIcon(
      'range',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/range.svg'
      )
    );
    this.activateRoute.params
      .subscribe(
        (params: Params) => {
          this.programId = +params['id'];
        }
      );
  }
  ngOnInit(): void {
    var t = this._router.routerState.snapshot.url;
    this.pathArr = t.split('/');
    this.getAllProgram();
    this.getProgramSessions();
    this._programService.getAllCoaches();
    this._programService.getAllCoachees()
    this._programService.coachees.subscribe(data => {
      this.coachees$ = data
    })
    this._programService.coaches.subscribe(data => {
      this.coaches$ = data
    });
    
    this.selectedBar = this.pathArr[this.pathArr.length - 1]
    this._router.events.subscribe((val) => {
      // see also 
      console.log(val instanceof NavigationEnd)
      var t = this._router.routerState.snapshot.url;
      this.pathArr = t.split('/');
      this.selectedBar = this.pathArr[this.pathArr.length - 1]
    });

    this.pService.reloadProgramDetail.subscribe({
      next: (res) => {
        this.getAllProgram();
      }
    });

  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getAvatarUrl(id: any, type: string) {

    var selectedList = (type === 'coach') ? this.coaches$.filter(Data => Data.id === id) : this.coachees$.filter(Data => Data.userId === id);

    return selectedList[0]?.profilePic ? this.profilePicPath + selectedList[0]?.profilePic : selectedList[0]?.name.charAt(0);
  }

  getAllProgram() {
    this.programService.getProgramDetails(this.programId).subscribe((response: any) => {
      if (response) {
        this.programDetails = response;
        this.remainingDays = countDays(response.endDate);
        this.oneOnOneCount = this.programDetails?.oneOnOneEngagements?.length;
        this.groupSessionCount = this.programDetails?.groupEngagements?.length;
        
      }
    });
  }
  
  getProgramSessions() {
    this._programService.getProgramSessions(this.programId).subscribe(res => {

      this._programService.sessionDetail.next({ isUpcomingSession: true, data: res?.data });

      this.sessionDetail = res?.data?.upcomingSessions;

    });
  }

  changeCreateEngagement(value: any) {
    this.createEngagement = value;
  }

  changeCoachDetail(event: any) {
    this.coachDetail = event;
  }

  changeSessionDetail(event: any) {
    this.sessionDetail = event;
  }
}


