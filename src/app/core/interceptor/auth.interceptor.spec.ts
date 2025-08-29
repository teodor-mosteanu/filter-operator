import { TestBed } from '@angular/core/testing';
import {
  HttpHandler,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';
import { of } from 'rxjs';
import {
  apiPassword,
  apiUsername,
  transationApiUrl,
} from '../constants/app.constants';

describe('authInterceptor', () => {
  const authToken = 'Basic ' + btoa(apiUsername + ':' + apiPassword);
  let mockRequest: HttpRequest<any>;
  let mockHandler: HttpHandler;
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mockHandler = {
      handle: (req: HttpRequest<any>) => {
        return of(new HttpResponse());
      },
    };
  });

  describe('when the request is a GET request to a different API', () => {
    beforeEach(() => {
      mockRequest = new HttpRequest('GET', 'http://localhost:8080/api/v1/');
    });
    it('should not add Authorization header to the request', () => {
      const spy = spyOn(mockRequest.headers, 'set').and.callThrough();
      interceptor(mockRequest, mockHandler.handle);
      expect(spy).not.toHaveBeenCalledWith('Authorization', authToken);
    });
  });

  describe('when the request is a GET request to the transactions API', () => {
    beforeEach(() => {
      mockRequest = new HttpRequest('GET', transationApiUrl);
    });
    it('should add Authorization header to the request', () => {
      const spy = spyOn(mockRequest.headers, 'set').and.callThrough();
      interceptor(mockRequest, mockHandler.handle);
      expect(spy).toHaveBeenCalledWith('Authorization', authToken);
    });

    it('should call the next handler with the modified request', () => {
      const spy = spyOn(mockHandler, 'handle').and.callThrough();
      interceptor(mockRequest, mockHandler.handle);
      expect(spy).toHaveBeenCalledWith(
        mockRequest.clone({
          headers: mockRequest.headers.set('Authorization', authToken),
        }),
      );
    });
  });
});
