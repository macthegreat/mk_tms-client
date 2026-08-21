import { Component, inject, OnInit } from '@angular/core';
import { EnrollmentStore } from '../../store/enrollment.store';

@Component({
  selector: 'app-enrollment-lis',
  imports: [],
  templateUrl: './enrollment-lis.html',
  styleUrl: './enrollment-lis.scss',
})
export class EnrollmentLis implements OnInit {
  store = inject(EnrollmentStore);
  ngOnInit() {
    this.store.loadEnrollments();
  }
  onApprove(id: string) {
    this.store.approveEnrollment(id);
  }
}
