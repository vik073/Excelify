import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : any;
  @Input() pageTitle: any;
  @Input() pageDescription: any;
  pathArr: string[];
  

  constructor(private _userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this._userService.user$
    .pipe()
    .subscribe((user: User) => {
        this.user = user;
    });
    var t = this.router.routerState.snapshot.url;
    this.pathArr = t.split('/');
  }

}
