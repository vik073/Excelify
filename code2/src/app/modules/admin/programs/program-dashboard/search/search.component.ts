import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  enteredSearchValue:string='';
  toggleValue : boolean = true;
  sortStartValue : boolean = true;
  sortEndValue : boolean = true;

  constructor() { }

  ngOnInit(): void {
  } 

  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() toggleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sortSDate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sortEDate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() createProgramEvent: EventEmitter<boolean> = new EventEmitter<boolean>();


    onSearchTextChanged(){
      this.searchTextChanged.emit(this.enteredSearchValue);
    }

    createProgram() {
      this.createProgramEvent.emit(true);
    }


    sliderToggle(){
      this.toggleChanged.emit(this.toggleValue)
    }

    sortStartDate(){
      this.sortSDate.emit(this.sortStartValue)
    }

    sortEndDate(){
      this.sortEDate.emit(this.sortEndValue)
    }
}
