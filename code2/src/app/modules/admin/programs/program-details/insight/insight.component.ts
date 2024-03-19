import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProgramsService } from '../../programs.service';

@Component({
  selector: 'app-insight',
  templateUrl: './insight.component.html',
  styleUrls: ['./insight.component.scss']
})
export class InsightComponent implements OnInit {
  selected: any = 'all';
  programId = 0;
  insightData:any;
  isLoading = true;

  constructor(private route: ActivatedRoute, private programsService: ProgramsService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.programId = +params['id'];
        }
      );

      this.getInsights();
  }

  getInsights() {
    this.programsService.getProgramInsights(this.programId).subscribe({
      next: res => {
        console.log(res);
        this.insightData = res?.data[0];
        this.isLoading = false;
      }, error: e => {
        this.isLoading = false;
      }
    })
  }

}
