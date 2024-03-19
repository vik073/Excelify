import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-details',
  templateUrl: './rating-details.component.html',
  styleUrls: ['./rating-details.component.scss']
})
export class RatingDetailsComponent implements OnInit {
  @Input() rating: any = false;

  constructor() { }

  ngOnInit(): void {
  }
  numSequence(n: number): Array<number> {
    return Array(n);
}
}
