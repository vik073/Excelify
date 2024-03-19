import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent implements OnInit {
  pathArr: string[];

  constructor(private router: Router,) { }

  ngOnInit(): void {
    var route = this.router.routerState.snapshot.url;
    this.pathArr = route.split('/');
    this.pathArr =  this.pathArr.map(item=>{
      return item = item.split('-').join(' ');
    })
  }

}
