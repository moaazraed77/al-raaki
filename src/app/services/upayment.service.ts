import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpaymentService {

  constructor(private http:HttpClient) { }
  
  // ---------------------------  payment gateway ---------------------------

  private apiUrl = 'https://sandboxapi.upayments.com/api/v1/charge'; // Replace with the actual UPayments API URL
  createPayment(cost:any): Observable<any> {
    
    // // const body = {
    // //   amount,
    // //   currency,
    // //   description
    // // };

    const body={
      "products": [
          {
              "name": "Logitech K380",
              "description": "Logitech K380 / Easy-Switch for Upto 3 Devices, Slim Bluetooth Tablet Keyboar ",
              "price": 10,
              "quantity": 1
          },
          {
              "name": "Logitech M171 Wireless Optical Mouse",
              "description": "Logitech M171 Wireless Optical Mouse  (2.4GHz Wireless, Blue Grey)",
              "price": 10,
              "quantity": 1
          }
      ],
      "order": {
          "id": "202210101255255144669",
          "reference": "11111991",
          "description": "Purchase order received for Logitech K380 Keyboard",
          "currency": "KWD",
          "amount": cost
      },
      "language": "en",
      "reference": {
          "id": "202210101202210101"
      },
      "customer": {
          "uniqueId": "2129879kjbljg767881",
          "name": "Dharmendra Kakde",
          "email": "kakde.dharmendra@upayments.com",
          "mobile": "+96566336537"
      },
      "returnUrl": "https://upayments.com/en/",
      "cancelUrl": "https://error.com",
      "notificationUrl": "https://webhook.site/d7c6e1c8-b98b-4f77-8b51-b487540df336",
      "customerExtraData": "User define data"
  }

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer jtest123' // Replace with your actual access token
  });

    return this.http.post(`${this.apiUrl}`, body,{headers});
  }
}
