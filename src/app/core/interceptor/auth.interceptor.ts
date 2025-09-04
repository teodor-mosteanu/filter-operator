import { HttpInterceptorFn } from '@angular/common/http';
import {
  apiPassword,
  apiUsername,
  transactionApiUrl,
} from '../constants/app.constants';

/*
 * NOTE: This interceptor is not used in the application.
 * It is included for demonstration purposes only to show how authentication could be implemented.
 * [TM 01/09/25]
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'Basic ' + btoa(apiUsername + ':' + apiPassword);

  if (req.method === 'GET' && req.url === transactionApiUrl) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });
    return next(authReq);
  }
  return next(req);
};
