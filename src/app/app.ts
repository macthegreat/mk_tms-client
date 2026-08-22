import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnrollmentStore } from './store/enrollment.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mk_tms-client');
  private store = inject(EnrollmentStore);
  ngOnInit() { this.store.loadEnrollments();
this.store.listenForLiveUpdates();
 }

}
