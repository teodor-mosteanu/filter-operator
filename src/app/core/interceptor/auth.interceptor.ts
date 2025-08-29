import { HttpInterceptorFn } from '@angular/common/http';
import {
  apiPassword,
  apiUsername,
  transationApiUrl,
} from '../constants/app.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'Basic ' + btoa(apiUsername + ':' + apiPassword);

  if (req.method === 'GET' && req.url === transationApiUrl) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });
    return next(authReq);
  }
  return next(req);
};
