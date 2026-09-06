import { Component, inject } from "@angular/core";
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course.model";

@Component({
  selector: "app-admin-course-list",
  standalone: true,
  templateUrl: "./admin-course-list.component.html",
  styleUrl: "./admin-course-list.component.scss",
})
export class AdminCourseListComponent {
  private courseService = inject(CourseService);

  courses: Course[] = [];
  error = "";

  constructor() {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => {
        console.error("Failed to load courses:", err);
        this.error = "Unable to load courses.";
      },
    });
  }
}
