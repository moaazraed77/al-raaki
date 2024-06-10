import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { order } from 'src/app/Modal/interfaces/order.interface';
import { product } from 'src/app/Modal/interfaces/product.interface';
import { SiteOrdersService } from 'src/app/services/site-orders.service';
import { UpaymentService } from 'src/app/services/upayment.service';

@Component({
  selector: 'app-payment-confirem-yes',
  templateUrl: './payment-confirem-yes.component.html',
  styleUrls: ['./payment-confirem-yes.component.scss']
})
export class PaymentConfiremYesComponent implements OnInit {

  
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
        for (const temp of responseMsgSplit) {
          this.confirem.push(temp.split("="))
        }
      }
    })
    paymentServ.postSiteOrder(this.confirmMsg)
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}