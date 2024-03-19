import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { zipAll } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  profilePicPath: string = environment.profilePicPath;
  selected: any = 'all';

  reviewDataArray : any = [{
    profilePic: '20210612051546_Sita_Sita.png',
    profileType: 'Coach',
    name: 'Radhe Nagarajan',
    skill: 'Leadership Skill',
    sessionType: '1:1 Session',
    description: "Super helpful class! I'm on my way to create a Digital Marketing Agency and I have found plenty of value inside this course. Highly recommend!"
  },
  {
    profilePic: '20210612051546_Sita_Sita.png',
    profileType: 'Coach',
    name: 'Radhe Nagarajan',
    skill: 'Leadership Skill',
    sessionType: '1:1 Session',
    description: "Super helpful class! I'm on my way to create a Digital Marketing Agency and I have found plenty of value inside this course. Highly recommend!"
  },
]

  constructor() { }

  ngOnInit(): void {
  }



}
