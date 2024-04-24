import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { product } from 'src/app/Modal/interfaces/product.interface';
import { social } from 'src/app/Modal/interfaces/social.interface';
import { ProductsService } from 'src/app/services/products.service';
import { SocialMediaService } from 'src/app/services/social-media.service';
import * as AOS from 'aos';
import { Store } from '@ngrx/store';
import { addToCart, removeFromCart } from 'src/app/store/cart.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../../Modal/main-style.css']
})
export class ProductsComponent implements OnDestroy {

  products: product[] = []

  whatsapp: social[] = []

  cart: product[] = []

  totalCost: number = 0;

  subscription: Subscription[] = []

  constructor(private productServ: ProductsService, private iconsServ: SocialMediaService , private store :Store) {
    // if (sessionStorage.getItem("page-attitude") != "products-page-working-fine") {
    //   sessionStorage.setItem("page-attitude", "products-page-working-fine")
    //   window.location.reload()
    // }
    this.subscription.push(this.productServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.products.push(data[key])
        }
      },
      error: () => { },
      complete: () => { }
    }))
    this.totalCost = 0;
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    for (let item of this.cart) {
      this.totalCost += item.productDiscount;
    }
    AOS.init();
  }

  // ----------------------- add to cart -----------------------
  addToCart(item: product) {
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    item.productDateChoosed = new Date().toLocaleDateString();
    item.productquantity = 1;
    if (!this.cart.find(ele => ele.id === item.id)) {
      this.totalCost = 0;
      this.cart.push(item);
      this.store.dispatch(addToCart())  // here we send the event on the action  using ==> this.store.dispatch()
      localStorage.setItem("products-cart", JSON.stringify(this.cart))
      for (let item of this.cart) {
        this.totalCost += item.productDiscount;
      }
    }
  }

  // ----------------------- delete from cart -----------------------
  delete(itemIndex: number) {
    this.totalCost = 0;
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    this.cart.splice(itemIndex, 1);
    this.store.dispatch(removeFromCart())  // here we send the event on the action  using ==> this.store.dispatch()
    localStorage.setItem("products-cart", JSON.stringify(this.cart));
    for (let item of this.cart) {
      this.totalCost += item.productDiscount;
    }

  }

  ngOnDestroy(): void {
    for (const item of this.subscription) {
      item.unsubscribe()
    }
  }

}
