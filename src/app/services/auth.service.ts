import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course, CourseDetail, PagedResponse } from '../models/course.model';

export interface TmsUser {
  displayName: string;
  role: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
@Injectable()
export class AuthService {
  private http = inject(HttpClient);
  currentUser = signal<TmsUser | null>(null);

  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.role === role || user?.role === 'Admin';
  }
  async login(credentials: LoginRequest) {
    await firstValueFrom(this.http.post<void>('/api/auth/login', credentials));
    const user = await firstValueFrom(this.http.get<TmsUser>('/api/auth/me'));
    this.currentUser.set(user);
  }
}
