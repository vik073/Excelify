import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-side-bar-chart',
  templateUrl: './side-bar-chart.component.html',
  styleUrls: ['./side-bar-chart.component.scss']
})
export class SideBarChartComponent implements OnInit, AfterViewInit , OnChanges {

    @Input() progress: number;
    @Input() imageSrc: string;
    @Input() text: string;
    @Input() size: string;
    @Input() count: string;
    

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.createCircle();
  }

  ngAfterViewInit(): void {
    this.createCircle();
  }

  createCircle() {
    
    const meters = document.querySelectorAll('svg[data-value] .meter');
    meters.forEach((path: any) => {
      // Get the length of the path
      let length = path.getTotalLength();
      let value = parseInt(path.parentNode.getAttribute('data-value'));
      let to = length * ((100 - this.progress) / 100);
      path.getBoundingClientRect();
      path.style.strokeDashoffset = Math.max(0, to);
    });

  }

}
