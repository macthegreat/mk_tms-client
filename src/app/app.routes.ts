import { Routes } from '@angular/router';

export const routes: Routes = [
    {
path: "dashboard", loadComponent: () =>
import("./features/student-dashboard/student-dashboard.component").then(
(m) => m.StudentDashboardComponent, ),
},
{ path: "", redirectTo: "dashboard", pathMatch: "full" },
{
path: 'courses/:id',
loadComponent: () => import('./features/course-detail/course-detail')
.then(m => m.CourseDetail) },
{
path: 'enroll',
loadComponent: () => import('./features/enrollment-form/enrollment-form')
.then(m => m.EnrollmentForm) },
{
path: 'dashboard', loadComponent: () =>
import('./features/instructor-dashboard/instructor-dashboard')
.then(m => m.InstructorDashboard) 
},
// ... your existing routes (enrollment-list, etc.)
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

{
path: 'dashboard', loadComponent: () =>
import('./features/instructor-dashboard/instructor-dashboard')
.then(m => m.InstructorDashboard) },

{
path: 'enrollments', loadComponent: () =>
import('./features/enrollment-lis/enrollment-lis') 
.then(m => m.EnrollmentLis)
},
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }



];

