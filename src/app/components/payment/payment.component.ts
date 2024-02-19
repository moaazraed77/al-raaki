import { Component } from '@angular/core';
import { product } from 'src/app/Modal/interfaces/product.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  cart: product[] = [];

  totalCost: number = 0;

  constructor() {
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
}
