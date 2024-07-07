import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { order } from 'src/app/Modal/interfaces/order.interface';
import { product } from 'src/app/Modal/interfaces/product.interface';
import { SiteOrdersService } from 'src/app/services/site-orders.service';
import { UpaymentService } from 'src/app/services/upayment.service';
import emailjs from '@emailjs/browser';

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
    this.confirmMsg=JSON.parse(sessionStorage.getItem("userPaymentData")!)
    this.route.events.subscribe(url => {
      if (url instanceof NavigationEnd) {
        let responseMsgSplitLength = url.url.split("/").length;
        let responseMsgSplit = url.url.replaceAll("%20", " ").split("/")[responseMsgSplitLength - 1].split("&");
        this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
        for (const temp of responseMsgSplit) {
          this.confirem.push(temp.split("="))
        }
      }
    })
    this.paymentServ.postSiteOrder(this.confirmMsg)
    // sending email 
emailjs.init("xggnLK_wdecwAvSZh")
emailjs.send("service_afcjqai","template_vtilrlc",{
from_name: this.confirmMsg.address.name,
from_email: this.confirmMsg.address.email,
to_name: "alroqya-q8.com",
to_email : "raqekuwait@gmail.com",
message: `
this customer need these products ,\n
${this.confirmMsg.buyMsg} \n
Toatal Price : ${this.confirmMsg.total} \n
`,
reply_to: "alroqya-q8.com",
request_id: this.confirmMsg.id,
phone: this.confirmMsg.address.phone,
});
// ------------------------------------------------------
emailjs.send("service_afcjqai","template_vtilrlc",{
  from_name : "alroqya-q8.com",
  from_email  : "raqekuwait@gmail.com",
  to_name: this.confirmMsg.address.name,
  to_email: this.confirmMsg.address.email,
  message: `
  this customer need these products ,\n
  ${this.confirmMsg.buyMsg} \n
  Toatal Price : ${this.confirmMsg.address} \n
  `,
  reply_to: "alroqya-q8.com",
  request_id: this.confirmMsg.id,
  phone: "***********",
  });
  }

}