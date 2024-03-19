import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-about-program',
  templateUrl: './about-program.component.html',
  styleUrls: ['./about-program.component.scss']
})
export class AboutProgramComponent implements OnInit {

  programId: any;
  @Input() programDetails: any;
  isEditable = false;
  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.programId = +params['id'];
        }
      );
  }

  onEdit() {
    this.isEditable = true;
  }

  saveAbout() {

  }

  onCancel() {
    this.isEditable = false;
  }

}
