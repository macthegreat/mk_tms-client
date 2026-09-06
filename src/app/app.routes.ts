import { Routes } from '@angular/router';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component')
        .then((m) => m.LoginComponent),
  },
  {
  path: 'register',
  loadComponent: () =>
    import('./features/register/register.component')
      .then((m) => m.RegisterComponent),
},

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/student-dashboard/student-dashboard.component')
        .then((m) => m.StudentDashboardComponent),
  },

  {
    path: 'instructor-dashboard',
    loadComponent: () =>
      import('./features/instructor-dashboard/instructor-dashboard')
        .then((m) => m.InstructorDashboard),
  },

  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./features/course-detail/course-detail')
        .then((m) => m.CourseDetail),
  },

  {
    path: 'enroll',
    loadComponent: () =>
      import('./features/enrollment-form/enrollment-form')
        .then((m) => m.EnrollmentForm),
  },

  {
    path: 'enrollments',
    loadComponent: () =>
      import('./features/enrollment-lis/enrollment-lis')
        .then((m) => m.EnrollmentLis),
  },

  {
    path: 'grade-submission',
    loadComponent: () =>
      import('./features/grade-submission/grade-submission.component')
        .then((m) => m.GradeSubmissionComponent),
  },

  {
    path: 'admin/courses',
    loadComponent: () =>
      import('./features/admin-course-list/admin-course-list.component')
        .then((m) => m.AdminCourseListComponent),
    canActivate: [roleGuard('Admin')],
  },

  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/unauthorized/unauthorized.component')
        .then((m) => m.UnauthorizedComponent),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];