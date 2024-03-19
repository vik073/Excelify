import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  profilePicPath: string = environment.profilePicPath;
  enteredSearchValue: string = '';

  reviewDataArray : any = [{
    profilePic: '20210612051546_Sita_Sita.png',
    profileType: 'Coach',
    name: 'Radhe Nagarajan',
    publishedDate: 'Last Published On: 02-12-2022',
    title: 'Coaching Tools',
    description: "Super helpful class! I'm on my way to create a Digital Marketing Agency and I have found plenty of value inside this course. Highly recommend!"
  },
  {
    profilePic: '20210612051546_Sita_Sita.png',
    profileType: 'Coach',
    name: 'Radhe Nagarajan',
    publishedDate: 'Last Published On: 02-12-2022',
    title: 'Coaching Tools',
    description: "Super helpful class! I'm on my way to create a Digital Marketing Agency and I have found plenty of value inside this course. Highly recommend!"
  },
]

  constructor() { }

  ngOnInit(): void {
  }

  searchUser(value: string) {
    // this.userDetails = cloneDeep(this.userArray);
    // this.userDetails = this.userDetails.__wrapped__;
    // if (value !== '') {
    //     this.userDetails = this.userDetails.filter(item => item.name?.toLowerCase().includes(value.toLowerCase()) || item.emailId?.toLowerCase().includes(value.toLowerCase()));
    // }
}

}
