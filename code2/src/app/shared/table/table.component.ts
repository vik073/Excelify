import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  type: string;
  lastSession: string;
  nextSession: string;
  total: string;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, AfterViewInit {


  @Input() headerColumns: any;
  @Input() tableData: any;
  @Input() showEdit: boolean = true;
  @Input() tableForm: any = [];
  @Input() displayedColumns: any = [];

  @Output() eventClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>();

  isLoading = true;

  pageNumber: number = 1;
  isEditableNew: boolean = true;

  constructor(
    private _liveAnnouncer: LiveAnnouncer) { }

  ngOnChanges(changes: SimpleChanges) {
    this.fillData();
  }

  ngOnInit(): void {
  }

  fillData() {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource((this.tableForm.get('VORows') as FormArray).controls);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('paginator') paginator: MatPaginator;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  applyFilter(event: Event) {
    //  ;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement, i) {
    this.eventClick.emit({ formElement: VOFormElement, index: i, type: 'edit' })
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);


  }

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement, i) {
    this.saveClick.emit(VOFormElement);
    // alert('SaveVO')
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }

  DeleteVO(VOFormElement, i) {
    debugger
    this.deleteClick.emit(VOFormElement.get('VORows').at(i)?.value);
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement, i) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }

  selectRow(element: any) {
    console.log(element?.value);
    this.rowClick.emit(element?.value);
  }

  

}
