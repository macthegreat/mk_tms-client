import { Component, inject, OnDestroy } from '@angular/core';
import { GradePayload, GradeService } from '../../services/grade.service';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject,Observable } from 'rxjs';
import { exhaustMap, takeUntil } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface GradeResponse {
  id: string;
  success: boolean;
}


@Component({
  selector: 'tms-grade-submission',
  imports: [ReactiveFormsModule,MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  MatButtonModule],
  templateUrl: './grade-submission.component.html',
  styleUrl: './grade-submission.component.scss',
})
export class GradeSubmissionComponent {
  private api = inject(GradeService); 
  private fb = inject(FormBuilder);

  gradeForm = this.fb.group({
studentId: [101, [Validators.required, Validators.min(1)]], courseId: [302, [Validators.required, Validators.min(1)]], score: [88, [Validators.required, Validators.min(0),Validators.max(100)]]
  });
isSubmitting = false; 
submissionStatus = '';

private submitClick$ = new Subject<GradePayload>(); constructor() {
this.submitClick$
.pipe(
  exhaustMap(payload => {
this.isSubmitting = true;
this.submissionStatus = 'Submitting grade to server...'; 
return this.api.postGrade(payload);
}),
 takeUntilDestroyed()
      )
.subscribe({
next: result => {
this.isSubmitting = false;
this.submissionStatus = `Grade saved successfully! Record ID: ${result.id}`;
},
error: err => {
this.isSubmitting = false;
this.submissionStatus = `Submission failed: ${err.message || 'Server error'}`;
} });
}


onSubmit() {
if (this.gradeForm.valid) {
const rawValue = this.gradeForm.getRawValue(); this.submitClick$.next({
        studentId: Number(rawValue.studentId),
        courseId: Number(rawValue.courseId),
        score: Number(rawValue.score)
});
 }
} 
}
