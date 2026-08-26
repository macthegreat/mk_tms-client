import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const detailMessage = err.error?.detail ?? 'A system error occurred. please try again.';

      if (err.status === 401) {
        router.navigate(['/login']);
      } else {
        console.error('API Error Response:', detailMessage);
      }
      return throwError(() => err);
    }),
  );
};
