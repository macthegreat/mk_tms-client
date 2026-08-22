import { Component, inject, OnInit, viewChild, effect,  } from '@angular/core';
import { EnrollmentStore } from '../../store/enrollment.store';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatSortModule, MatSort } from '@angular/material/sort';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'app-enrollment-lis',
  imports: [MatPaginatorModule,MatSortModule,MatTableModule],
  templateUrl: './enrollment-lis.html',
  styleUrl: './enrollment-lis.scss',
})
export class EnrollmentLis  {
 store = inject(EnrollmentStore);
displayedColumns = ['studentName', 'courseName', 'status', 'actions'];
dataSource = new MatTableDataSource<Enrollment>();

readonly paginator = viewChild.required(MatPaginator); 
readonly sort = viewChild.required(MatSort);
constructor() {
  effect(() => {
this.dataSource.data = this.store.entities(); 
});
effect(() => {
this.dataSource.paginator = this.paginator(); this.dataSource.sort = this.sort();
});
this.store.loadEnrollments();

  // ngOnInit() {
  //   this.store.loadEnrollments();
  // }
  // onApprove(id: string) {
  //   this.store.approveEnrollment(id);
  }
}
