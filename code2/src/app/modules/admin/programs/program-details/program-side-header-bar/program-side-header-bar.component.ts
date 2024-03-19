import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-program-side-header-bar',
  templateUrl: './program-side-header-bar.component.html',
  styleUrls: ['./program-side-header-bar.component.scss']
})
export class ProgramSideHeaderBarComponent implements OnInit , OnChanges {
  @Input() headerText: any;
  @Input() coacheData: any;
  @Input() oneOnOneSessions: any ;
  @Input() groupSessions: any ;
  @Input() engagementCount: any ;
  
  profilePicPath: string = environment.profilePicPath;
  progress: any ;

  get total() {
    return this.oneOnOneSessions + this.groupSessions;
  }

  

  constructor() { }

  ngOnInit(): void {
    const oneOnOn = parseInt(this.oneOnOneSessions);
    const total = parseInt(this.oneOnOneSessions) + parseInt(this.groupSessions)
    this.progress = this.percentage( oneOnOn ,total )

  }


  ngOnChanges(changes: SimpleChanges): void {
    const oneOnOn = parseInt(this.oneOnOneSessions);
    const total = parseInt(this.oneOnOneSessions) + parseInt(this.groupSessions)

    this.progress = this.percentage( oneOnOn ,total )

  }
  percentage(percent, total) {
    
    return ((percent/ total) * 100).toFixed(2)
}

}
