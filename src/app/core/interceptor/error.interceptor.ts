import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggerService } from '../services/logger.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const loggerService = inject(LoggerService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Log the error
      loggerService.log(error.message);
      // Re-throw the error to be caught by the component that initiated the request
      return throwError(() => new Error(error.message));
    }),
  );
};
