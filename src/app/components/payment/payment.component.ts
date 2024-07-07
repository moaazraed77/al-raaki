import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { order } from 'src/app/Modal/interfaces/order.interface';
import { product, productForPayment } from 'src/app/Modal/interfaces/product.interface';
import { social } from 'src/app/Modal/interfaces/social.interface';
import { SiteOrdersService } from 'src/app/services/site-orders.service';
import { SocialMediaService } from 'src/app/services/social-media.service';
import { UpaymentService } from 'src/app/services/upayment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  cart: product[] = [];

  cartDataForPayment: any[] = []

  totalCost: number = 0;

  whatsappDataLink: product[] = [];

  whatsappDataLinkMsg: string = "";

  whatsapp: social[] = [];

  fakeWhatsappButton: boolean = true;

  showAlertMsg: boolean = false;

  address = this.formbuilder.group({
    name: ["", Validators.required],
    phone: ["", Validators.required],
    email: ["", [Validators.required , Validators.email]],
    country: ["", Validators.required],
    area: ["", Validators.required],
    block: ["", Validators.required],
    gadah: [""],
    street: ["", Validators.required],
    home: ["", Validators.required],
  })


  constructor(private formbuilder: FormBuilder, private iconsServ: SocialMediaService, private toastr: ToastrService,
    private paymentServ: UpaymentService, private ordersServ: SiteOrdersService) {
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    for (let item of this.cart) {
      this.totalCost += item.productDiscount * item.productquantity!;
    }
    this.totalCost += 3;

  }

  calc(price: number, i: number, value: number) {
    this.totalCost -= 3;
    if ((this.cart[i].productquantity! + value) > 0) {
      this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
      this.totalCost -= price * this.cart[i].productquantity!;
      this.cart[i].productquantity! += value;
      this.totalCost += price * this.cart[i].productquantity!;
      localStorage.setItem("products-cart", JSON.stringify(this.cart));
    }
    this.totalCost += 3;
  }

  viewRealWatsApp() {
    if (this.address.valid)
      this.fakeWhatsappButton = false
    else
      this.fakeWhatsappButton = true
  }
  // ----------------------- delete from cart -----------------------
  delete(itemIndex: number) {
    this.totalCost = 0;
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    this.cart.splice(itemIndex, 1);
    localStorage.setItem("products-cart", JSON.stringify(this.cart));
    for (let item of this.cart) {
      this.totalCost += item.productDiscount * item.productquantity!;
    }
    if (this.totalCost != 0)
      this.totalCost += 3;
  }

  payment() {
    let msg = "", products: productForPayment[] = [], order: order = {} as order;
    this.whatsappDataLink = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    if (this.whatsappDataLink.length > 0) {
      for (const temp of this.whatsappDataLink) {
        msg += `
\nاسم المنتج : ${temp.productsTitle} 
\nالكمية المطلوبة : ${temp.productquantity} 
\n`;
      }
    }
    this.whatsappDataLinkMsg = `مرحبا اريد الحصول علي هذه المنتجات\n${msg}\nالسعر الكلي شامل خدمة التوصيل: ${this.totalCost} د.ك\nالعنوان \nدولة : ${this.address.value.country}\nمنطقة : ${this.address.value.area}\nالقطعة : ${this.address.value.block}\nالجاده :  ${this.address.value.gadah}\nشارع : ${this.address.value.street}\nمنزل :  ${this.address.value.home}\nرقم الهاتف : ${this.address.value.phone}`
    
    for (const item of this.whatsappDataLink) {
      products.push({
        "name": item.productsTitle,
        "description": item.productsDetails,
        "price": item.productDiscount ,
        "quantity": item.productquantity!
      })
    }

    this.paymentServ.createPayment(this.totalCost, products, this.whatsappDataLinkMsg, this.address.value.name!, this.address.value.phone!).subscribe(result => {
      // window.open(result.data.link)
      order.products = products;
      order.total = this.totalCost;
      order.id = new Date().getTime();
      order.address = this.address.value;
      order.buyMsg=this.whatsappDataLinkMsg
      sessionStorage.setItem("userPaymentData", JSON.stringify(order));
      window.open(result.data.link, "_self")
      this.address.reset()
    })
  }

}
