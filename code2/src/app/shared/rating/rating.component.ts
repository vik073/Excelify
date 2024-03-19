import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

    @Input() rating: any = false;
  
    constructor() { }
  
    ngOnInit(): void {
    }
    numSequence(n: number): Array<number> {
      return Array(n);
  }
  }
