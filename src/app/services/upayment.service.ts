import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product, productForPayment } from '../Modal/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class UpaymentService {

  constructor(private http: HttpClient) { }

  // ---------------------------  payment gateway ---------------------------

  private apiUrl = 'https://uapi.upayments.com/api/v1/charge'; // Replace with the actual UPayments API URL
  createPayment(cost: number , products:productForPayment[],customerExtraData:string,name:string,phone:string): Observable<any> {

    const body = {
      "products": products,
      // order details ؟
      "order": {
        "id": "202210101255255144669", 
        // "reference": "11111991",  
        "description": "Purchase order received from Alroqa-8", 
        "currency": "KWD", 
        "amount": cost 
      },
      "language": "en",
      "reference": {
        "id": "202210101202210101" 
      },
      // customer => user  
      "customer": {
        "uniqueId": "2129879kjbljg767881",
        "name": name,
        // "email": "kakde.dharmendra@upayments.com",
        "mobile": phone
      },
      "returnUrl": "https://upayments.com/en/",
      "cancelUrl": "https://error.com",
      "notificationUrl": "https://webhook.site/d7c6e1c8-b98b-4f77-8b51-b487540df336",
      "customerExtraData": customerExtraData
    }

    return this.http.post(`${this.apiUrl}`, body);
  }
}