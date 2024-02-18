import { Component } from '@angular/core';
import { product } from 'src/app/Modal/interfaces/product.interface';
import { social } from 'src/app/Modal/interfaces/social.interface';
import { ProductsService } from 'src/app/services/products.service';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../../Modal/main-style.css']
})
export class ProductsComponent {

  products: product[] = []

  whatsapp: social[] = []

  cart: product[] = []

  totalCost: number = 0;
  
  constructor(private productServ: ProductsService, private iconsServ: SocialMediaService) {
    // if (sessionStorage.getItem("page-attitude") != "products-page-working-fine") {
    //   sessionStorage.setItem("page-attitude", "products-page-working-fine")
    //   window.location.reload()
    // }
    this.productServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.products.push(data[key])
        }
      },
      error: () => { },
      complete: () => { }
    })

    // ----------------------- get whatsapp -----------------------
    iconsServ.getSocialAPI("whats").subscribe(data => {
      for (const key in data) {
        this.whatsapp.push(data[key])
      }
    })

    this.totalCost=0;
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    for (let item of this.cart) {
      this.totalCost += item.productDiscount;
    }
  }

  // ----------------------- add to cart -----------------------
  addToCart(item: product) {
    this.totalCost=0;
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    item.productsDetails=new Date().toLocaleDateString();
    this.cart.push(item);
    localStorage.setItem("products-cart", JSON.stringify(this.cart))
    for (let item of this.cart) {
      this.totalCost += item.productDiscount;
    }
  }

  // ----------------------- delete from cart -----------------------
  delete(itemIndex: number) {
    this.totalCost=0;
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    this.cart.splice(itemIndex, 1);
    localStorage.setItem("products-cart", JSON.stringify(this.cart));
    for (let item of this.cart) {
      this.totalCost += item.productDiscount;
    }
  }

}
