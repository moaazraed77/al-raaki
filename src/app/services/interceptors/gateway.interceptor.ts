import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GatewayInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // for test 
    // if (request.url.includes("https://sandboxapi.upayments.com/api/v1/charge"))
    //   request = request.clone({
    //     setHeaders: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer jtest123'
    //     }
    //   })
    if (request.url.includes("https://uapi.upayments.com/api/v1/charge"))
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 22011c315b04b1dbe9277684687cd5190d266539'
        }
      })
    return next.handle(request);
  }
}
