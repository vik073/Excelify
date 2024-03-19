import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ProgramsService } from '../../../programs.service';

@Component({
  selector: 'app-rating-side-bar',
  templateUrl: './rating-side-bar.component.html',
  styleUrls: ['./rating-side-bar.component.scss']
})
export class RatingSideBarComponent implements OnInit {

  coachees$: any;
  programArray: any[];
  coaches$: any;
  create: any = true;
  profilePicPath: string = environment.profilePicPath;

  coachDetails: any = {
    profilePic: '',
    firstName: 'Rubik',
    lastName: 'Agarwal',
    email: 'user@gmail.com',
    phone: '+91 9292949490',

  }
  constructor( private _programService: ProgramsService) { }

  ngOnInit(): void {
    this._programService.getAllCoaches();
        this._programService.getAllCoachees()
        this._programService.coachees.subscribe(data => {
            this.coaches$ = data
        })
        this._programService.coaches.subscribe(data => {
            this.coachees$ = data
        });  
  }

  numSequence(n: number): Array<number> {
    return Array(n);
}

getAvatarUrl(id: any, type: string) {

    var selectedList = (type === 'coach') ? this.coaches$.filter(Data => Data.id === id) : this.coachees$.filter(Data => Data.userId === id);

    return selectedList[0].profilePic ? this.profilePicPath + selectedList[0].profilePic : selectedList[0].name.charAt(0);
}

}