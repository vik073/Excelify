import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss']
})
export class ProfileBarComponent implements OnInit, AfterViewInit {
  @Input() progress: number;
  @Input() imageSrc: string;
  @Input() text: string;
  @Input() index: string;

  ngOnInit(): void {
   // this.createCircle();

  }

  ngAfterViewInit(): void {
    this.createCircle();
  }



  createCircle() {
    // Inspired by https://codepen.io/davatron5000/pen/jzMmME

    // Get all the Meters
    
    const meters = document.querySelectorAll('svg[data-value] .meter');

  
      let length = meters[this.index].getTotalLength();
      let value = parseInt(meters[this.index].parentNode.getAttribute('data-value')); 
      // Calculate the percentage of the total length
      let to = length * ((100 - this.progress) / 100);
      meters[this.index].getBoundingClientRect();
      // Set the Offset
      meters[this.index].style.strokeDashoffset = Math.max(0, to);
      meters[this.index].nextElementSibling.textContent = `${this.text}`;

  }

}