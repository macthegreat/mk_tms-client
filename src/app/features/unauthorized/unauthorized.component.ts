import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="unauthorized">
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>

      <a routerLink="/dashboard">Back to Dashboard</a>
    </div>
  `,
})
export class UnauthorizedComponent {}