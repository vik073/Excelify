import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ProgramsService } from '../../programs.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  coaches$: any = [];
  filterCoachListData: any;
  coachees$: any;
  filterCoacheeListData: any;
  pathArr: string[];
  selectedChild: any = 'addCoach';
  create: any = true;
  profilePicPath: string = environment.profilePicPath;
  EngagementType: any = ['Group-Session', '1:1 Session', 'Individiual']
  engagementForm = new FormGroup({
    engagementName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    engagementType: new FormControl('', [Validators.required]),
    coaches: new FormControl('', [Validators.required]),
    coachees: new FormControl('', [Validators.required]),
    });

    get coaches(): any {
      return this.engagementForm.get('coaches');
    }
    get coachees(): any {
      return this.engagementForm.get('coachees');
    }
  constructor(private route: ActivatedRoute , private router: Router, private _programService: ProgramsService,) { }

  ngOnInit(): void {
    
    var t = this.router.routerState.snapshot.url;
        this.pathArr = t.split('/');
    this.route.params.subscribe((params: Params) => {
      const prodId = params['id'];
   });
   this.selectedChild = this.pathArr[this.pathArr.length-2]
   this._programService.getAllCoaches();
   this._programService.getAllCoachees();

   this.getAllCoaches();
   this.getAllCoachees();
  }

getAllCoaches() {
  this._programService.coaches.subscribe((data: any) => {
      this.coaches$ = data;
      this.filterCoachListData = this.coaches$;
  });
}

getAllCoachees() {
  this._programService.coachees.subscribe((data: any) => {
      this.coachees$ = data;
      this.filterCoacheeListData = this.coachees$;
  });
}

filterData(event:any): void {

  if (!event.query) {
      switch (event.searchType) {
          case 'coaches':
              this.filterCoachListData = this.coaches;
              break;
      }
      return;
  } else {
      switch (event.searchType) {
          case 'coaches':
              this.filterCoachListData = this.coaches.filter(coache => coache.name.toLowerCase().includes(event.query.toLowerCase()));
              break;


      }

  }
}

addSelection(event: any) {
  switch (event.type) {
      case 'competencies':
          this._programService.onSelectedCompentenciesChanged.next(event.data);
          break;
      case 'coaches':
          this._programService.onSelectedCoachesChanged.next(event.data);
          break;
      case 'coachees':
          this._programService.onSelectedCoacheesChanged.next(event.data);
          break;
  }
}

}
