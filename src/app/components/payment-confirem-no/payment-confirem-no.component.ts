import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { order } from 'src/app/Modal/interfaces/order.interface';
import { product } from 'src/app/Modal/interfaces/product.interface';
import { SiteOrdersService } from 'src/app/services/site-orders.service';
import { UpaymentService } from 'src/app/services/upayment.service';

@Component({
  selector: 'app-payment-confirem-no',
  templateUrl: './payment-confirem-no.component.html',
  styleUrls: ['./payment-confirem-no.component.scss']
})
export class PaymentConfiremNoComponent {

  confirem: any[] = [{}];

  confirmMsg: order = {} as order

  cart: product[] = [];

  constructor(private route: Router, private paymentServ:SiteOrdersService) {
    this.confirmMsg=JSON.parse(sessionStorage.getItem("userPaymentData")!)
    route.events.subscribe(url => {
      if (url instanceof NavigationEnd) {
        let responseMsgSplitLength = url.url.split("/").length;
        let responseMsgSplit = url.url.replaceAll("%20", " ").split("/")[responseMsgSplitLength - 1].split("&");
        this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
        // console.log(this.cart)
        for (const temp of responseMsgSplit) {
          this.confirem.push(temp.split("="))
          // if (temp.split("=")[0] == "result") {
          //   if (temp.split("=")[1] != "NOT CAPTURED" 
          //   && temp.split("=")[1] != "CANCELED" 
          //   && temp.split("=")[1] != "Not a valid API request" 
          //   && temp.split("=")[1] != "invalid" 
          //   && temp.split("=")[1] != "not accepted" 
          //   && temp.split("=")[1] != "" 
          //   && temp.split("=")[1] != "error"
          //   && temp.split("=")[1] != "Unauthorized") {
          //     this.confirmMsg = "true"
          //   } else {
          //     this.confirmMsg = "false"
          //   }
          // }
        }
      paymentServ.postSiteOrder(this.confirmMsg)
      }
    })
  }

}
