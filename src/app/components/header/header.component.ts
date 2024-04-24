import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/Modal/interfaces/product.interface';
import { social } from 'src/app/Modal/interfaces/social.interface';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // upload(event:any){
  //   const files=event.target.files;
  //     let loader=new FileReader();
  //     loader.readAsDataURL(event.target.files[0])
  //     loader.onload=(event)=>{
  //       console.log(event.target?.result);  // show the photos before uploading
  //     }
  //   }

  // icons form dash 
  whatsapp: social[] = []
  instagram: social[] = []
  snapchat: social[] = []
  youtube: social[] = []
  facebook: social[] = []

  cart: product[] = []

  totalCost: number = 0;

  // here we will ==> call the select function to select the reducer 
  cartCount = this.store.select("myCart")
  // then we put the reducer in the store module
  constructor(private iconsServ: SocialMediaService , private store:Store<{myCart:number}>) {

    // ----------------------- get whatsapp -----------------------
    iconsServ.getSocialAPI("whats").subscribe(data => {
      for (const key in data) {
        this.whatsapp.push(data[key])
      }
    })
    // ----------------------- get instagram -----------------------
    iconsServ.getSocialAPI("insta").subscribe(data => {
      for (const key in data) {
        this.instagram.push(data[key])
      }
    })
    // ----------------------- get snapchat -----------------------
    iconsServ.getSocialAPI("snapchat").subscribe(data => {
      for (const key in data) {
        this.snapchat.push(data[key])
      }
    })
    // ----------------------- get facebook -----------------------
    iconsServ.getSocialAPI("facebook").subscribe(data => {
      for (const key in data) {
        this.facebook.push(data[key])
      }
    })
    // ----------------------- get snapchat -----------------------
    iconsServ.getSocialAPI("youtube").subscribe(data => {
      for (const key in data) {
        this.youtube.push(data[key])
      }
    })
  }
  //----------------------------------------------------------------

  // ----------------------- add to cart -----------------------
  // ----------------------- add to cart -----------------------
  addToCart(item: product) {
    this.totalCost = 0;
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    this.cart.push(item);
    localStorage.setItem("products-cart", JSON.stringify(this.cart))
    for (let item of this.cart) {
      this.totalCost += item.productDiscount;
    }
  }

  del(itemIndex: number) {
    this.totalCost = 0;
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    this.cart.splice(itemIndex, 1);
    localStorage.setItem("products-cart", JSON.stringify(this.cart));
    for (let item of this.cart) {
      this.totalCost += item.productDiscount;
    }
  }

}
