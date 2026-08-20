import { CourseCard } from '../../ui/course-card/course-card';
import { Component, signal,inject, computed } from '@angular/core';
import { Course } from '../../models/course.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseService } from '../../services/course.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCard],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
@Injectable({
  providedIn: 'root'
})



export class StudentDashboardComponent {
  private api = inject(CourseService);
  studentName = signal('Liya Kebede');
  earnedCredits = signal(45);
  //   selectedCourse = signal<Course | null>(null);
  //   sampleCourse: Course = {
  //   id: 1,
  //   title: "Advanced Java Services",
  //   code: "CSE-101",
  //   maxCapacity: 30,
  //   enrollmentCount: 12,
  // };
  // handleEnroll(course: Course) { this.selectedCourse.set(course);
  // console.log('Enrollment requested for:', course.title);
  // }
  graduationStatus = computed(() =>
    this.earnedCredits() >= 120 ? 'Eligible for Graduation' : 'In Progress',
  );

  coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });

  selectedCourse = signal<Course | null>(null);

  handleEnroll(course: Course) {
    this.selectedCourse.set(course);

    console.log('Enrollment requested for:', course.title);
  }

  registerForClass() {
    this.earnedCredits.update((c) => c + 3);
  }
}
