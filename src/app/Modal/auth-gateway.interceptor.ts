import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentComponent } from '../components/payment/payment.component';


export class AuthGatewayInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes("https://sandboxapi.upayments.com/api/v1/charge")) {
      console.log(request.url)
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer jtest123' // Replace with your actual access token
      });
      request = request.clone({
        setHeaders: { Authorization: 'Bearer jtest123' }
      })
    }

    return next.handle(request);
  }
}
